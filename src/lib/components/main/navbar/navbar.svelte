<script lang="ts">
    import LogoHorizontal from "$assets/images/logo-horizontal.svelte";
    import type { User } from "$lib/models/user";

    import ProfileMenu from "./profile-menu.svelte";
    import { Button } from "$components/ui/button";

    import { cn } from "$lib/utils";

    interface Props {
        user?: User;
        class?: string;
    }

    const { user, class: className }: Props = $props();
</script>

<nav
    class={cn(
        className,
        "flex h-nav w-full flex-col items-center justify-center self-stretch overflow-hidden px-8 max-md:max-w-full"
    )}
>
    <div class="flex min-h-[80px] w-full max-w-[1280px] items-center justify-between gap-10">
        <div class="my-auto flex items-center gap-1.5 self-stretch whitespace-nowrap text-2xl">
            <a href={user ? "/home" : "/"}>
                <LogoHorizontal class="h-full min-h-6 w-full min-w-28" />
            </a>
        </div>
        <div class="flex space-x-2">
            {#if !user}
                <Button
                    class="my-auto self-stretch text-sm leading-7 text-secondary"
                    variant="link"
                    href="/playground"
                >
                    Playground
                </Button>
                <Button
                    class="my-auto self-stretch text-sm leading-7 text-secondary"
                    variant="link"
                    href="/login"
                >
                    Sign in
                </Button>
            {:else}
                <ProfileMenu {user} />
            {/if}
        </div>
    </div>
</nav>
