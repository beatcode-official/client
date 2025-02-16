<script lang="ts">
    import { DifficultiesStyle } from "$assets/config/game";
    import { Skeleton } from "$components/ui/skeleton";
    import * as Tooltip from "$components/ui/tooltip";

    import type { ProblemDetails } from "$lib/models/game";
    import { SquareArrowOutUpRight } from "lucide-svelte";
    interface Props {
        content?: ProblemDetails;
    }

    let { content }: Props = $props();
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
</script>

<div class="h-full overflow-y-auto bg-background px-4 py-5">
    {#if content?.title}
        <h2 class="mb-2 text-2xl font-semibold">{content.title}</h2>
    {:else}
        <Skeleton class="mb-2 h-8 w-[250px]" />
    {/if}
    <div class="mb-4 flex space-x-2">
        {#if content?.difficulty}
            <div
                class="rounded-md bg-neutral px-2 pb-px text-sm {DifficultiesStyle[
                    content.difficulty
                ]}"
            >
                {capitalize(content.difficulty)}
            </div>
        {/if}
        {#if content?.source}
            <Tooltip.Provider delayDuration={50}>
                <Tooltip.Root>
                    <Tooltip.Trigger>
                        <a
                            href={content.source}
                            class="flex items-center rounded-md bg-neutral px-2 pb-px text-sm transition-all duration-150 hover:bg-secondary"
                            target="_blank"
                        >
                            <SquareArrowOutUpRight class="mr-1 mt-px h-3 w-3" />
                            <span>Source</span>
                        </a>
                    </Tooltip.Trigger>
                    <Tooltip.Content
                        class="border border-secondary bg-background-dark text-sm text-foreground"
                        >Please don't use this to cheat :></Tooltip.Content
                    >
                </Tooltip.Root>
            </Tooltip.Provider>
        {/if}
    </div>
    <div
        class="prose prose-invert !h-[2px] prose-p:mb-4 prose-code:font-normal prose-code:text-foreground/70 prose-code:before:content-none prose-code:after:content-none prose-pre:my-0 prose-pre:bg-neutral prose-pre:text-base prose-ul:mt-0"
    >
        {#if content?.description}
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html content.description}
            <div class="py-8"></div>
        {:else}
            <div class="mb-8 space-y-2">
                <Skeleton class="h-4 w-full" />
                <Skeleton class="h-4 w-3/4" />
            </div>
            <div class="mb-8 space-y-4">
                <div class="mb-8 space-y-2">
                    <Skeleton class="h-4 w-[200px]" />
                    <Skeleton class="h-24 w-1/2" />
                </div>
            </div>
            <div class="space-y-2">
                <Skeleton class="h-4 w-[200px]" />
                <Skeleton class="h-4 w-[200px]" />
            </div>
        {/if}
    </div>
</div>
