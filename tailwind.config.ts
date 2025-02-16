import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import tailwindcssTypography from "@tailwindcss/typography";
import plugin from "tailwindcss/plugin";

const config: Config = {
    darkMode: ["class"],
    content: ["./src/**/*.{html,js,svelte,ts}"],
    safelist: ["dark"],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px"
            }
        },
        extend: {
            height: {
                nav: "var(--navbar-height)",
                navscreen: "calc(100dvh - var(--navbar-height) - 1px)",
                fullscreen: "calc(100vh - var(--navbar-height) - var(--footer-height) - 1px)"
            },
            minHeight: {
                nav: "var(--navbar-height)",
                navscreen: "calc(100vh - var(--navbar-height) - 1px)",
                fullscreen: "calc(100vh - var(--navbar-height) - var(--footer-height) - 1px)"
            },
            colors: {
                border: "hsl(var(--border) / <alpha-value>)",
                input: "hsl(var(--input) / <alpha-value>)",
                ring: "hsl(var(--ring) / <alpha-value>)",
                background: {
                    DEFAULT: "hsl(var(--background) / <alpha-value>)",
                    dark: "hsl(var(--background-dark) / <alpha-value>)"
                },
                foreground: "hsl(var(--foreground) / <alpha-value>)",
                primary: {
                    DEFAULT: "hsl(var(--primary) / <alpha-value>)",
                    foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
                    foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
                    foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
                },
                muted: {
                    DEFAULT: "hsl(var(--muted) / <alpha-value>)",
                    foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
                },
                accent: {
                    DEFAULT: "hsl(var(--accent) / <alpha-value>)",
                    foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
                },
                popover: {
                    DEFAULT: "hsl(var(--popover) / <alpha-value>)",
                    foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
                },
                card: {
                    DEFAULT: "hsl(var(--card) / <alpha-value>)",
                    foreground: "hsl(var(--card-foreground) / <alpha-value>)"
                },
                neutral: {
                    DEFAULT: "hsl(var(--neutral) / <alpha-value>)",
                    foreground: "hsl(var(--neutral-foreground) / <alpha-value>)"
                },
                rose: {
                    DEFAULT: "hsl(var(--rose) / <alpha-value>)",
                    foreground: "hsl(var(--rose-foreground) / <alpha-value>)"
                },
                "pale-gold": {
                    DEFAULT: "#F4E99F"
                },
                "navy-blue": {
                    DEFAULT: "#305B93"
                },
                sidebar: {
                    DEFAULT: "hsl(var(--sidebar-background))",
                    foreground: "hsl(var(--sidebar-foreground))",
                    primary: "hsl(var(--sidebar-primary))",
                    "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
                    accent: "hsl(var(--sidebar-accent))",
                    "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
                    border: "hsl(var(--sidebar-border))",
                    ring: "hsl(var(--sidebar-ring))"
                }
            },
            borderRadius: {
                xl: "calc(var(--radius) + 4px)",
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)"
            },
            fontFamily: {
                sans: [
                    "-apple-system",
                    "BlinkMacSystemFont",
                    "Segoe UI",
                    "Roboto",
                    "Helvetica Neue",
                    "Arial",
                    "sans-serif"
                ],
                mono: ["Consolas", "Monaco", "Courier New", "monospace"],
                icon: ["Typori"]
            },
            textShadow: {
                sm: "0 1px 2px var(--tw-shadow-color)",
                DEFAULT: "0 2px 4px var(--tw-shadow-color)",
                lg: "0 8px 16px var(--tw-shadow-color)",
                center: "0 0 12px var(--tw-shadow-color)"
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--bits-accordion-content-height)" }
                },
                "accordion-up": {
                    from: { height: "var(--bits-accordion-content-height)" },
                    to: { height: "0" }
                },
                "caret-blink": {
                    "0%,70%,100%": { opacity: "1" },
                    "20%,50%": { opacity: "0" }
                },
                shimmer: {
                    "100%": {
                        transform: "translateX(100%)"
                    }
                }
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
                "caret-blink": "caret-blink 1.25s ease-out infinite"
            }
        }
    },
    plugins: [
        tailwindcssAnimate,
        tailwindcssTypography,
        plugin(function ({ addUtilities, matchUtilities, theme }) {
            addUtilities({
                ".my-center": {
                    marginTop: "auto",
                    marginBottom: "auto",
                    transform: "translateY(calc(-1 * var(--navbar-height)))"
                }
            });
            matchUtilities(
                {
                    "text-shadow": (value) => ({
                        textShadow: value
                    })
                },
                { values: theme("textShadow") }
            );
        })
    ]
};

export default config;
