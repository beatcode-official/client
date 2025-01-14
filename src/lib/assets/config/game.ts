import {
    MatchDecorator,
    Decoration,
    ViewPlugin,
    ViewUpdate,
    type EditorView,
    type DecorationSet
} from "@codemirror/view";
import { Prec } from "@codemirror/state";

export const Ratings = [
    { name: "O(n!)", class: "bg-gradient-to-br from-neutral-700 to-neutral-600" },
    { name: "O(2^n)", class: "bg-gradient-to-br from-green-400 to-green-300 text-green-950" },
    { name: "O(n²)", class: "bg-gradient-to-br from-blue-600 to-blue-500" },
    { name: "O(nlog(n))", class: "bg-gradient-to-br from-purple-500 to-purple-400" },
    { name: "O(n)", class: "bg-gradient-to-br from-yellow-300 to-yellow-200 text-amber-800" },
    { name: "O(log(n))", class: "bg-gradient-to-br from-orange-800 to-orange-700" },
    { name: "O(1)", class: "bg-gradient-to-br from-slate-200 to-slate-400 text-slate-950" }
];

export const Abilities = [
    {
        name: "healio",
        desc: "Heal your HP by 20",
        class: "bg-green-300 text-green-950 rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 20
    },
    {
        name: "deletio",
        desc: "Delete a random line of your opponent's code",
        class: "bg-rose text-rose-foreground rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "syntaxio",
        desc: "Turn off your opponent's syntax highlighting for 30 seconds",
        class: "bg-slate-900 text-green-400 rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "lightio",
        desc: "Turn your opponent's editor to light mode for 30 seconds",
        class: "bg-neutral-100 text-amber-600 rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "hugio",
        desc: "Make your opponent's code 2 times bigger for 30 seconds",
        class: "bg-pale-gold text-navy-blue rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    },
    {
        name: "smallio",
        desc: "Make your opponent's code 2 times smaller for 30 seconds",
        class: "bg-navy-blue text-pale-gold rounded-[1px] px-px font-bold",
        sp: 10,
        mp: 5
    }
];

export const AbilitiesDecorators = Abilities.map((ability) => {
    const regexp = new RegExp(`\\b${ability.name}\\b`, "g");
    const decoration = Decoration.mark({
        class: `ability ${ability.class}`,
        tagName: "span",
        attributes: { title: ability.desc }
    });
    return new MatchDecorator({ regexp, decoration });
});

export const AbilitiesHighlighters = AbilitiesDecorators.map((decorator) =>
    Prec.highest(
        ViewPlugin.fromClass(
            class {
                decorations: DecorationSet;

                constructor(view: EditorView) {
                    this.decorations = decorator.createDeco(view);
                }
                update(update: ViewUpdate) {
                    this.decorations = decorator.updateDeco(update, this.decorations);
                }
            },
            {
                decorations: (v) => v.decorations
            }
        )
    )
);

export const DifficultiesStyle = {
    easy: "text-green-400",
    medium: "text-amber-400",
    hard: "text-red-400"
};
