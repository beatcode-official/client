<script lang="ts">
    import type { SubmissionResults, TestResult } from "$lib/models/game";
    import { cn } from "$lib/utils";

    interface Props {
        results?: SubmissionResults;
    }

    let { results }: Props = $props();
    let testCases = $state<TestResult[]>([]);
    let selected = $state<number>(0);
    let isSelectedPassed = $derived<boolean>(testCases[selected]?.passed ?? false);
    let selectedOutput = $derived<string | undefined | null>(testCases[selected]?.output);
    let selectedError = $derived<string | undefined | null>(testCases[selected]?.error);
    let selectedExpected = $derived<string | undefined | null>(testCases[selected]?.expected);

    function parseArguments(input: string): string[] {
        const regex = /--arg\d+=(.*?)(?=\s--arg\d+|$)/g;
        const matches = [];
        let match;
        while ((match = regex.exec(input)) !== null) {
            matches.push(match[1]);
        }
        return matches;
    }

    $effect(() => {
        if (results?.sample_results && results?.test_results) {
            testCases = [...results.sample_results, ...results.test_results];
        }
    });

    $effect(() => {
        selected = testCases.findIndex((test) => !test.passed) ?? 0;
    });
</script>

<div class="w-full overflow-y-auto bg-background p-4">
    {#if results}
        {#if results.success}
            <div class="space-y-4">
                <span
                    class="text-xl font-medium {isSelectedPassed
                        ? 'text-green-400'
                        : 'text-destructive'}"
                    >{isSelectedPassed ? "Correct Answer" : "Wrong Answer"}</span
                >
                <div class="flex flex-wrap gap-x-2 gap-y-4">
                    {#each testCases as details, i}
                        <button
                            class={cn(
                                "flex cursor-pointer items-center rounded-lg px-4 py-1 font-medium text-foreground/50 hover:bg-accent/10 hover:text-foreground",
                                selected === i ? "bg-accent/10 text-foreground" : ""
                            )}
                            onclick={() => (selected = i)}
                        >
                            <div
                                class={cn(
                                    "mr-2 h-1 w-1 rounded-full",
                                    details.passed ? "bg-green-400" : "bg-red-500"
                                )}
                            ></div>
                            <div>Case {i + 1}</div>
                        </button>
                    {/each}
                </div>
                <div class="space-y-4">
                    <!-- Input -->
                    {#if testCases[selected]?.input_data}
                        <div>
                            <h4 class="mb-2 text-xs font-medium text-secondary/75">Input</h4>
                            <div class="space-y-2">
                                {#each parseArguments(testCases[selected].input_data ?? "--arg1=") as input}
                                    <div class="rounded-sm bg-neutral p-3 font-mono">
                                        {input}
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/if}
                    <!-- Output -->
                    <div>
                        <h4 class="mb-2 text-xs font-medium text-secondary/75">Output</h4>
                        {#if selectedOutput && selectedOutput !== ""}
                            <div class="rounded-sm bg-neutral p-3 font-mono">
                                {selectedOutput}
                            </div>
                        {:else if selectedError && selectedError !== ""}
                            <div
                                class="rounded-sm bg-destructive/10 p-3 font-mono text-destructive"
                            >
                                {selectedError}
                            </div>
                        {:else}
                            <div class="rounded-sm bg-neutral p-3 font-mono">
                                Empty (Please check your code)
                            </div>
                        {/if}
                    </div>

                    <!-- Expected -->
                    {#if selectedExpected}
                        <div>
                            <h4 class="mb-2 text-xs font-medium text-secondary/75">Expected</h4>
                            <div class="rounded-sm bg-neutral p-3 font-mono">
                                {selectedExpected}
                            </div>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="space-y-4">
                <span class="text-xl font-medium text-destructive">Runtime Error</span>
                <div class="rounded-lg bg-destructive/10 p-3 font-mono text-destructive">
                    <span>{results?.message ?? "No output"}</span>
                </div>
            </div>
        {/if}
    {:else}
        <div class="h-full w-full">
            <p>Test cases are not available, please run your code first.</p>
        </div>
    {/if}
</div>

<style>
</style>
