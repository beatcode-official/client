<script lang="ts">
    import { scale } from "svelte/transition";
    import { backOut } from "svelte/easing";
    import { onClickOutside } from "runed";
    import { Button } from "$components/ui/button";
    import { Card } from "$components/ui/card";
    import { Input } from "$components/ui/input";
    import { MessageSquare, Send, X } from "lucide-svelte";
    import type { ChatMessage } from "$models/room";

    interface Props {
        username?: string;
        history: ChatMessage[];
        onSend: (message: string) => void;
    }

    let { username, history, onSend }: Props = $props();

    let isOpen = $state<boolean>(true);
    let inputValue = $state<string>("");
    let alertNewMessage = $state<boolean>(false);

    let chatMenu = $state<HTMLDivElement | null>(null);
    let chatContainer = $state<HTMLDivElement | null>(null);
    let inputElm = $state<HTMLDivElement | null>(null);

    let currentHistoryLength = $state<number>(history.length);

    $effect(() => {
        if (!username && history.length > 0) {
            username = history[0].sender;
        }
    });

    $effect(() => {
        if (!chatContainer) return;

        if (history) {
            chatContainer.scrollTo({
                top: chatContainer.scrollHeight
            });
        }
    });

    $effect(() => {
        if (history.length > currentHistoryLength) {
            if (!isOpen) {
                alertNewMessage = true;
            }
            currentHistoryLength = history.length;
        }
    });

    $effect(() => {
        if (isOpen && inputElm) {
            inputElm.focus();
        }
    });

    const handleSend = (event: Event) => {
        event.preventDefault();
        if (inputValue.trim()) {
            onSend(inputValue.trim());
            inputValue = "";
        }
    };

    const handleOpenChat = () => {
        isOpen = true;
        alertNewMessage = false;
    };

    const formatTime = (timestamp: number) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    };

    onClickOutside(
        () => chatMenu,
        () => (isOpen = false)
    );
</script>

<div bind:this={chatMenu} class="fixed bottom-4 right-4 z-50">
    {#if isOpen}
        <div class="origin-bottom-right" transition:scale={{ duration: 300, easing: backOut }}>
            <Card class="relative flex h-96 w-80 flex-col overflow-y-hidden">
                <div
                    class="flex items-center justify-between border-b border-b-neutral bg-background px-3 py-2 text-foreground"
                >
                    <h3 class="font-semibold">Chat</h3>
                    <X
                        class="h-4 w-4 cursor-pointer text-foreground"
                        onclick={() => (isOpen = false)}
                    />
                </div>
                <div
                    bind:this={chatContainer}
                    class="flex h-full flex-col overflow-y-auto overflow-x-hidden bg-background-dark px-4 pb-4 pt-2"
                >
                    <div class="flex-1"></div>
                    <div class="grid w-full auto-rows-min grid-rows-[1fr_auto] space-y-2">
                        {#each history as text}
                            <div
                                class="group flex items-center gap-2 {text.sender === username
                                    ? 'origin-bottom-right flex-row-reverse'
                                    : 'origin-bottom-left'}"
                                transition:scale={{ duration: 300, easing: backOut }}
                            >
                                <div
                                    class="peer max-w-48 whitespace-pre-wrap break-words rounded-lg px-4 py-2
                        {text.sender === username
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground'}"
                                >
                                    {text.message}
                                </div>
                                <span
                                    class="text-sm text-secondary opacity-0 transition-all duration-150 peer-hover:opacity-100"
                                    >{formatTime(text.timestamp)}</span
                                >
                            </div>
                        {/each}
                    </div>
                </div>

                <div class="border-t bg-background p-3">
                    <form onsubmit={handleSend} class="flex items-center gap-2">
                        <Input
                            type="text"
                            placeholder="Type a message..."
                            bind:value={inputValue}
                            bind:ref={inputElm}
                            containerClass="w-full"
                        />
                        <Button type="submit" size="icon" class="aspect-square h-full">
                            <Send class="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    {:else}
        <div
            class="absolute bottom-0 right-0"
            transition:scale={{ duration: 300, easing: backOut }}
        >
            <div class="relative">
                <Button
                    variant="default"
                    size="icon"
                    class="h-12 w-12 rounded-full transition-all duration-150 focus:scale-90"
                    onclick={handleOpenChat}
                >
                    <MessageSquare class="h-6 w-6" />
                </Button>
                {#if alertNewMessage}
                    <div
                        class="absolute -right-1 -top-1 flex h-4 w-4 origin-center items-center justify-center rounded-full bg-red-500"
                        transition:scale={{ duration: 300, easing: backOut }}
                    >
                        <span class="text-xs font-bold text-white">!</span>
                    </div>
                {/if}
            </div>
        </div>
    {/if}
</div>
