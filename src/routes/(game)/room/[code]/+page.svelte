<script lang="ts">
    import { onDestroy } from "svelte";
    import { toast } from "svelte-sonner";
    import { type Infer, superForm } from "sveltekit-superforms";
    import type { PageProps } from "./$types";
    import { goto } from "$app/navigation";

    import { createWebSocket } from "$lib/websocket.svelte";

    import { Button, buttonVariants } from "$components/ui/button";
    import * as Dialog from "$components/ui/dialog";
    import { Separator } from "$components/ui/separator";
    import { RoomSettingsForm } from "$components/game/room";
    import StatusIndicator from "$components/misc/status-indicator.svelte";
    import PromptSignIn from "$components/misc/prompt-sign-in.svelte";

    import type { RoomState, RoomSettingsSchema, ChatMessage } from "$models/room";
    import { announce } from "$lib/utils";

    import { Copy, LogOut, Link, Settings } from "lucide-svelte";
    import { Chat } from "$components/game/chat";

    let { data }: PageProps = $props();
    let roomState = $state<RoomState>();

    let isHost = $derived(roomState?.host_name === data.user?.username);

    let userReady = $derived(isHost ? roomState?.host_ready : roomState?.guest_ready);
    let userStatus = $derived(userReady ? 1 : 0);

    let opponentName = $derived(
        isHost ? roomState?.guest_display_name : roomState?.host_display_name
    );
    let opponentReady = $derived(isHost ? roomState?.guest_ready : roomState?.host_ready);
    let opponentStatus = $derived(opponentName ? (opponentReady ? 1 : 0) : -1);

    let chatHistory = $state<ChatMessage[]>([]);

    // Room WebSocket
    let ws: ReturnType<typeof createWebSocket>;
    ws = createWebSocket(data?.token ?? "");
    if (data.user && data.token) {
        ws.setUrl(`${data.websocketUrl}/rooms/${data.roomCode}`);
        ws.connect();
    }

    $effect(() => {
        if (ws.status === "CLOSED") {
            toast.error(ws.reason ?? "You left the room");
            goto("/custom");
        }
    });

    $effect(() => {
        if (ws.message) {
            let { type, data } = ws.message;
            switch (type) {
                case "game_started":
                    window.open("/", "_blank");
                    if (roomState) {
                        roomState.guest_ready = false;
                    }
                    break;
                case "room_state":
                    roomState = data;
                    if (isHost && !userReady) {
                        ws.send("toggle_ready");
                    }
                    break;
                case "settings_updated":
                    if (roomState) {
                        roomState.settings = data;
                    }
                    break;
                case "chat":
                    if (
                        chatHistory.length === 0 ||
                        chatHistory[chatHistory.length - 1].timestamp !== data.timestamp
                    ) {
                        chatHistory = [...chatHistory, data];
                    }
                    break;
                case "error":
                    toast.error(data.message);
                    break;
                default:
                    break;
            }
        }
    });

    const startGame = (e: Event) => {
        e.preventDefault();
        if (!roomState?.guest_name) {
            toast.error("Can't start game without an opponent");
        } else if (!opponentReady) {
            toast.error("Opponent is not ready");
        } else {
            ws.send("start_game");
        }
    };

    const toggleReady = () => {
        ws.send("toggle_ready");
    };

    const sendMessage = (message: string) => {
        ws.send("chat", { message });
    };

    const leaveRoom = () => {
        ws.close();
        goto("/custom");
    };

    // Update room settings
    const updateRoomSettingsForm = superForm<Infer<typeof RoomSettingsSchema>>(
        data.updateRoomSettingsForm,
        {
            id: "update-room-settings",
            onResult: ({ result }) => {
                announce(result, "Room settings updated");
            }
        }
    );

    $effect(() => {
        if (!roomState) return;
        updateRoomSettingsForm.form.set(roomState.settings);
    });

    // Utils
    const copy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
    };

    onDestroy(() => {
        ws.close();
    });
</script>

<svelte:head>
    {#if roomState?.host_display_name}
        <title>{roomState.host_display_name}'s Room - BeatCode</title>
        <meta name="og:title" content="{roomState.host_display_name}'s Room - BeatCode" />
    {:else}
        <title>Custom Room - BeatCode</title>
        <meta name="og:title" content="Custom Room - BeatCode" />
    {/if}
</svelte:head>

<div class="mx-auto mt-16 flex flex-col items-center">
    <h1 class="mb-2 text-5xl font-bold">
        {roomState?.host_name ? `${roomState?.host_display_name}'s` : "Game"} Room
    </h1>
    <p class="mb-2 text-xl">Code: {data.roomCode}</p>
    <div class="mb-4 flex items-center gap-2">
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8 p-1.5"
            onclick={() => copy(data.roomCode)}
        >
            <Copy />
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8 p-1.5"
            onclick={() => copy(`${data.websiteUrl}/room/${data.roomCode}`)}
        >
            <Link />
        </Button>
        <Dialog.Root>
            <Dialog.Trigger
                class="h-8 w-8 p-1.5 {buttonVariants({
                    variant: 'outline',
                    size: 'icon'
                })}"><Settings /></Dialog.Trigger
            >
            <Dialog.Content class="max-h-screen overflow-auto sm:max-w-[425px]">
                <Dialog.Header>
                    <Dialog.Title>Update room settings</Dialog.Title>
                    <Dialog.Description>Please fill out the room settings below.</Dialog.Description
                    >
                </Dialog.Header>
                <RoomSettingsForm form={updateRoomSettingsForm} action="?/updateSettings">
                    <Dialog.Footer>
                        <Button type="submit">Update</Button>
                    </Dialog.Footer>
                </RoomSettingsForm>
            </Dialog.Content>
        </Dialog.Root>
        <Button variant="outline" size="icon" class="h-8 w-8 p-1.5" onclick={leaveRoom}>
            <LogOut />
        </Button>
    </div>
    <div class="my-4 flex w-full items-center justify-center gap-12">
        <div
            class="border-1 h-full w-full max-w-[400px] rounded-xl border border-secondary px-6 py-4"
        >
            <div class="flex items-center">
                <h2 class="mr-2 text-2xl font-semibold">{data.user?.display_name ?? "Player"}</h2>
                <StatusIndicator status={userStatus} />
            </div>
            <p class="text-lg">The mightiest coder of all</p>
        </div>
        <Separator orientation="vertical" text="VS" />
        <div
            class="border-1 h-full w-full max-w-[400px] rounded-xl border border-secondary px-6 py-4{opponentName
                ? ''
                : ' animate-pulse'}"
        >
            <div class="flex items-center">
                <h2 class="mr-2 text-2xl font-semibold">
                    {opponentName || "Waiting for opponent..."}
                </h2>
                <StatusIndicator status={opponentStatus} />
            </div>
            {#if opponentName}
                <p class="text-lg">The brave one who dares to challenge you</p>
            {:else}
                <p class="text-lg">Who will it be?</p>
            {/if}
        </div>
    </div>
    {#if isHost}
        <Button size="lg" class="mt-4 text-lg" onclick={startGame}>Start Game</Button>
    {:else if userReady}
        <Button size="lg" class="mt-4 text-lg" variant="ghost" onclick={toggleReady}
            >Cancel Ready</Button
        >
    {:else}
        <Button size="lg" class="mt-4 text-lg" onclick={toggleReady}>Ready</Button>
    {/if}
</div>

<Chat username={data?.user?.username} history={chatHistory} onSend={sendMessage} />

<!-- If not authenticated - prompt user to sign in -->
<PromptSignIn
    user={data.user}
    loginUrl={`/login?joining=${data.roomCode}`}
    guestAction="?/joinRoomAsGuest"
/>

<style>
</style>
