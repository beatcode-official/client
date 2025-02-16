import { basicSetup, EditorView } from "codemirror";
import { Compartment, EditorState, Prec, type Extension } from "@codemirror/state";
import { acceptCompletion } from "@codemirror/autocomplete";
import { indentWithTab } from "@codemirror/commands";
import { lintGutter, setDiagnostics, type Diagnostic } from "@codemirror/lint";
import { indentUnit } from "@codemirror/language";
import { keymap } from "@codemirror/view";
import { indentationMarkers } from "@replit/codemirror-indentation-markers";

import { DefaultTheme } from "./themes";
import { handleDeletio, handleSyntaxio, handleLightio, handleSizeChange } from "./abilities";
import { Abilities, AbilitiesHighlighters, LanguageConfig } from "$assets/config/game";
import type { Languages } from "$lib/models/game";

const fontSize = new Compartment();
const language = new Compartment();

export class EditorData {
    #view: EditorView | null = null;
    lang: Languages = "python";
    #langExt: Extension = language.of(LanguageConfig[this.lang].support);
    #tabSize: number = 4;
    #useAbility: (ability: string) => void = (ability: string) => ability !== "";
    #exts = [
        basicSetup,
        DefaultTheme,
        this.#langExt,
        indentUnit.of(" ".repeat(this.#tabSize)),
        indentationMarkers(),
        lintGutter(),
        fontSize.of([]),
        keymap.of([{ key: "Tab", run: acceptCompletion }, indentWithTab]),
        EditorView.lineWrapping,
        EditorView.theme({
            "&": {
                transition: "font-size 300ms ease-in-out"
            },
            "&.cm-focused": {
                outline: "none"
            }
        }),
        EditorView.editorAttributes.of({
            spellcheck: "false",
            "data-enable-grammarly": "false"
        }),
        EditorView.updateListener.of((update) => {
            if (update.docChanged) {
                localStorage.setItem(`${this.lang}CachedCode`, update.state.doc.toString());
            }
        }),
        ...AbilitiesHighlighters,
        Prec.highest(
            // For using abilities
            keymap.of([
                {
                    key: "Enter",
                    run: (view: EditorView) => {
                        const state = view.state;
                        const content = state.doc.toString();
                        for (const ability of Abilities) {
                            if (content.includes(ability.name)) {
                                console.log(ability.name);
                                this.#useAbility(ability.name);

                                // Remove the word from editor
                                const start = content.indexOf(ability.name);
                                const end = start + ability.name.length;
                                view.dispatch({
                                    changes: {
                                        from: start,
                                        to: end,
                                        insert: ""
                                    }
                                });

                                return true;
                            }
                        }
                        return false;
                    }
                }
            ])
        )
    ];
    #state: EditorState = EditorState.create({ extensions: this.#exts });

    #setup() {
        if (!this.#view) throw new Error("Editor view not linked");
        this.lang = (localStorage.getItem("lang") as Languages) || "python";
        this.#view.setState(this.#state);
        this.setLang(this.lang);
    }

    link(view: EditorView, useAbility: (ability: string) => void) {
        this.#view = view;
        this.#useAbility = useAbility;
        this.#setup();
    }

    getCode() {
        if (!this.#view) throw new Error("Editor view not linked");
        return this.#view.state.doc.toString();
    }

    setCode(code: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        const cachedCode = localStorage.getItem(`${this.lang}CachedCode`) || "";
        this.#state = EditorState.create({
            doc: cachedCode.trim() !== "" ? cachedCode : code,
            extensions: this.#exts
        });
        this.#view.setState(this.#state);
    }

    setLang(lang: Languages) {
        if (!this.#view) throw new Error("Editor view not linked");
        this.lang = lang;
        this.#view.dispatch({
            effects: language.reconfigure(LanguageConfig[lang].support)
        });
    }

    processError(error: string) {
        if (!this.#view) return;

        // Extract line number from the error message
        const offset = 5;
        const match = error.match(/line\s+(\d+)/);
        if (!match) return;

        let lineNum = +match[1] - offset;
        const docLines = this.#view.state.doc.lines;
        if (lineNum < 1) lineNum = 1;
        if (lineNum > docLines) lineNum = docLines;

        let lineInfo = this.#view.state.doc.line(lineNum);
        if (!lineInfo) return;
        let from = lineInfo.from;
        let to = lineInfo.to;

        if (error.toLowerCase().includes("traceback")) {
            const lineMatches = [...error.matchAll(/line\s+(\d+)/g)];
            // console.log(lineMatches);
            if (lineMatches.length > 0) {
                const lastMatch = lineMatches[lineMatches.length - 1];
                lineNum = +lastMatch[1] - offset;
                if (lineNum < 1) lineNum = 1;
                if (lineNum > docLines) lineNum = docLines;
                lineInfo = this.#view.state.doc.line(lineNum);

                from = lineInfo.from;
                to = lineInfo.to;
            }
        }

        // Create the diagnostic
        const diagnostics: Diagnostic[] = [
            {
                from,
                to,
                severity: "error",
                message: error
            }
        ];

        // Apply the diagnostics using setDiagnostics
        this.#view.dispatch(setDiagnostics(this.#view.state, diagnostics));
    }

    resetError() {
        if (!this.#view) return;
        this.#view.dispatch(setDiagnostics(this.#view.state, []));
    }

    triggerAbility(ability: string) {
        if (!this.#view) throw new Error("Editor view not linked");
        switch (ability) {
            case "deletio":
                handleDeletio(this.#view);
                break;
            case "syntaxio":
                handleSyntaxio(this.#view, this.#langExt, this.#exts);
                break;
            case "lightio":
                handleLightio(this.#view, this.#exts);
                break;
            case "hugio":
                handleSizeChange(this.#view, fontSize, 2);
                break;
            case "smallio":
                handleSizeChange(this.#view, fontSize, 0.5);
                break;
        }
    }
}
