import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const config = defineConfig({
    theme: {
        breakpoints: {
            sm: "320px",
            md: "768px",
            lg: "960px",
            xl: "1200px",
        },
        tokens: {
            colors: {
                brand: {
                    50: { value: "#e3f9f7" },
                    100: { value: "#c1ecea" },
                    200: { value: "#9bdcdc" },
                    300: { value: "#74cbd0" },
                    400: { value: "#4dbac3" },
                    500: { value: "#329ea7" },
                    600: { value: "#267e82" },
                    700: { value: "#1b5d5c" },
                    800: { value: "#103b36" },
                    900: { value: "#031d1a" },
                },
                background: { value: "#fefefe" },
                foreground: { value: "#1a202c" },
                primary: { value: "{colors.brand.500}" },
                secondary: { value: "#718096" },
                gray: {
                    50: { value: "#f7fafc" },
                    100: { value: "#edf2f7" },
                    200: { value: "#e2e8f0" },
                    300: { value: "#cbd5e0" },
                    400: { value: "#a0aec0" },
                    500: { value: "#718096" },
                    600: { value: "#4a5568" },
                    700: { value: "#2d3748" },
                    800: { value: "#1a202c" },
                    900: { value: "#171923" },
                },
                // أضف ألوان أخرى حسب حاجتك...
            },
        },
        semanticTokens: {
            colors: {
                background: { value: "{colors.background}" },
                foreground: { value: "{colors.foreground}" },
                primary: { value: "{colors.primary}" },
                secondary: { value: "{colors.secondary}" },
                error: { value: "#E53E3E" }, // أحمر
                success: { value: "#38A169" }, // أخضر
                warning: { value: "#DD6B20" }, // برتقالي
            },
        },
        keyframes: {
            spin: {
                from: { transform: "rotate(0deg)" },
                to: { transform: "rotate(360deg)" },
            },
            pulse: {
                "0%, 100%": { opacity: 1 },
                "50%": { opacity: 0.5 },
            },
        },
        textStyles: {
            heading: {
                value: {
                    fontWeight: "700",
                    lineHeight: "1.2",
                    letterSpacing: "-0.02em",
                },
            },
            body: {
                value: {
                    fontWeight: "400",
                    lineHeight: "1.5",
                },
            },
        },
        layerStyles: {
            card: {
                value: {
                    padding: "1rem",
                    borderRadius: "md",
                    boxShadow: "md",
                    backgroundColor: "{colors.background}",
                },
            },
        },
    },
    cssVarsPrefix: "ck",
    cssVarsRoot: ":where(:root, :host)",
    preflight: true,
    strictTokens: true,
});

const system = createSystem(defaultConfig, config);

export default system;
