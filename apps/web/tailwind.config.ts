import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--text-primary)",
        slate: "var(--text-secondary)",
        line: "var(--border)",
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          600: "var(--primary)",
          700: "var(--primary-hover)",
        },
        teal: "var(--secondary)",
        orange: "var(--accent)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
      },
      spacing: {
        "s1": "var(--space-1)",
        "s2": "var(--space-2)",
        "s3": "var(--space-3)",
        "s4": "var(--space-4)",
        "s5": "var(--space-5)",
        "s6": "var(--space-6)",
      },
      borderRadius: {
        "sm": "var(--radius-sm)",
        "md": "var(--radius-md)",
        "lg": "var(--radius-lg)",
      },
      boxShadow: {
        soft: "var(--shadow-sm)",
        card: "var(--shadow-md)",
      }
    }
  },
  plugins: []
};

export default config;
