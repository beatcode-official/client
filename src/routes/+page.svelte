<script lang="ts">
    import { onMount } from "svelte";
    import { gsap } from "gsap";
    import { TextPlugin } from "gsap/TextPlugin";

    gsap.registerPlugin(TextPlugin);

    import { SparkleIcon } from "lucide-svelte";

    import HeroImg from "$assets/images/hero.png?enhanced";
    import { Button } from "$components/ui/button";
    import { cn } from "$lib/utils.js";

    let isNotMounted = true;

    onMount(() => {
        isNotMounted = false;
        gsap.registerPlugin(TextPlugin);
        const tl = gsap.timeline();
        tl.to(".header-1", {
            duration: 1.5,
            text: "Head-to-head coding battle",
            ease: "none"
        });
        tl.to(".header-2", {
            duration: 0.25,
            text: "with",
            ease: "none"
        });
        tl.from(".header-3", {
            opacity: 0
        });
        tl.to(".header-3", {
            duration: 1,
            text: "magic",
            ease: "none"
        });
        tl.from(".sparkle", {
            duration: 0.5,
            opacity: 0,
            scale: 0,
            ease: "back.out(2)"
        });
        tl.to(".sparkle", {
            duration: 3,
            rotation: 360,
            ease: "elastic.out(1,0.5)",
            repeat: -1,
            repeatDelay: 0
        });
    });
</script>

<section class="flex flex-col items-center overflow-hidden">
    <div class="mb-8 mt-24 flex flex-col items-center">
        <h1 class="clip-path-inset absolute h-px w-px overflow-hidden whitespace-nowrap">
            Head-to-head coding battle with magic
        </h1>
        <div
            class="relative flex h-32 flex-col gap-2 text-center text-5xl font-semibold text-neutral-100 md:text-6xl"
        >
            <span class="header-1 w-full"></span>
            <span class="flex w-full justify-center">
                <span class="header-2"></span>
                &nbsp;
                <span
                    class="header-3 mt-1 rounded-sm bg-rose/10 px-2 font-mono text-rose shadow-rose text-shadow-center md:mt-1.5"
                    class:hidden={isNotMounted}
                ></span>
                <SparkleIcon
                    class={cn(
                        "sparkle ml-2 mt-2 h-12 w-12 stroke-rose text-rose shadow-rose text-shadow-[0_0_12px_#EBADC1]",
                        isNotMounted ? "hidden" : ""
                    )}
                    fill="#EBADC1"
                />
            </span>
        </div>
    </div>
    <Button class="text-md font-medium lg:text-lg" href="/login">Start now</Button>
    <enhanced:img
        src={HeroImg}
        alt="Hero"
        class="mx-auto w-2/3 max-w-[1280px] flex-1 object-contain"
    />
</section>
