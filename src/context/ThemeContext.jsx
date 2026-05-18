import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ── Theme definitions ─────────────────────────────────────
// Each theme defines CSS custom property values injected on :root
export const THEMES = {
  default: {
    label: "Default Dark",
    preview: ["#050816", "#8B5CF6", "#0B1739"],
    vars: {
      "--bg-page":      "#050816",
      "--bg-sidebar":   "#0B1739",
      "--bg-card":      "#111C44",
      "--bg-input":     "#0B1739",
      "--border":       "rgba(255,255,255,0.1)",
      "--text-primary": "#ffffff",
      "--text-muted":   "#9CA3AF",
      "--accent":       "#8B5CF6",
      "--accent-hover": "#7C3AED",
      "--accent-glow":  "rgba(139,92,246,0.2)",
      "--glow-color":   "rgba(139,92,246,0.2)",
    },
  },
  neon: {
    label: "Neon Purple",
    preview: ["#0D0221", "#BF00FF", "#1A0533"],
    vars: {
      "--bg-page":      "#0D0221",
      "--bg-sidebar":   "#1A0533",
      "--bg-card":      "#200A3E",
      "--bg-input":     "#1A0533",
      "--border":       "rgba(191,0,255,0.25)",
      "--text-primary": "#F0E6FF",
      "--text-muted":   "#B39DDB",
      "--accent":       "#BF00FF",
      "--accent-hover": "#9900CC",
      "--accent-glow":  "rgba(191,0,255,0.25)",
      "--glow-color":   "rgba(191,0,255,0.3)",
    },
  },
  ocean: {
    label: "Ocean Blue",
    preview: ["#020B18", "#0EA5E9", "#041529"],
    vars: {
      "--bg-page":      "#020B18",
      "--bg-sidebar":   "#041529",
      "--bg-card":      "#071E3D",
      "--bg-input":     "#041529",
      "--border":       "rgba(14,165,233,0.2)",
      "--text-primary": "#E0F2FE",
      "--text-muted":   "#7DD3FC",
      "--accent":       "#0EA5E9",
      "--accent-hover": "#0284C7",
      "--accent-glow":  "rgba(14,165,233,0.2)",
      "--glow-color":   "rgba(14,165,233,0.25)",
    },
  },
  emerald: {
    label: "Emerald Green",
    preview: ["#021A0E", "#10B981", "#042D1A"],
    vars: {
      "--bg-page":      "#021A0E",
      "--bg-sidebar":   "#042D1A",
      "--bg-card":      "#063D24",
      "--bg-input":     "#042D1A",
      "--border":       "rgba(16,185,129,0.2)",
      "--text-primary": "#D1FAE5",
      "--text-muted":   "#6EE7B7",
      "--accent":       "#10B981",
      "--accent-hover": "#059669",
      "--accent-glow":  "rgba(16,185,129,0.2)",
      "--glow-color":   "rgba(16,185,129,0.25)",
    },
  },
  sunset: {
    label: "Sunset Orange",
    preview: ["#1A0A00", "#F97316", "#2D1200"],
    vars: {
      "--bg-page":      "#1A0A00",
      "--bg-sidebar":   "#2D1200",
      "--bg-card":      "#3D1A00",
      "--bg-input":     "#2D1200",
      "--border":       "rgba(249,115,22,0.2)",
      "--text-primary": "#FFF7ED",
      "--text-muted":   "#FDBA74",
      "--accent":       "#F97316",
      "--accent-hover": "#EA580C",
      "--accent-glow":  "rgba(249,115,22,0.2)",
      "--glow-color":   "rgba(249,115,22,0.25)",
    },
  },
  rose: {
    label: "Rose Pink",
    preview: ["#1A0510", "#F43F5E", "#2D0A1C"],
    vars: {
      "--bg-page":      "#1A0510",
      "--bg-sidebar":   "#2D0A1C",
      "--bg-card":      "#3D0F26",
      "--bg-input":     "#2D0A1C",
      "--border":       "rgba(244,63,94,0.2)",
      "--text-primary": "#FFF1F2",
      "--text-muted":   "#FDA4AF",
      "--accent":       "#F43F5E",
      "--accent-hover": "#E11D48",
      "--accent-glow":  "rgba(244,63,94,0.2)",
      "--glow-color":   "rgba(244,63,94,0.25)",
    },
  },
  midnight: {
    label: "Midnight Black",
    preview: ["#000000", "#6366F1", "#0A0A0A"],
    vars: {
      "--bg-page":      "#000000",
      "--bg-sidebar":   "#0A0A0A",
      "--bg-card":      "#111111",
      "--bg-input":     "#0A0A0A",
      "--border":       "rgba(255,255,255,0.08)",
      "--text-primary": "#F9FAFB",
      "--text-muted":   "#6B7280",
      "--accent":       "#6366F1",
      "--accent-hover": "#4F46E5",
      "--accent-glow":  "rgba(99,102,241,0.2)",
      "--glow-color":   "rgba(99,102,241,0.2)",
    },
  },
  cyberpunk: {
    label: "Cyberpunk",
    preview: ["#0A0A1A", "#FACC15", "#0F0F2A"],
    vars: {
      "--bg-page":      "#0A0A1A",
      "--bg-sidebar":   "#0F0F2A",
      "--bg-card":      "#14143A",
      "--bg-input":     "#0F0F2A",
      "--border":       "rgba(250,204,21,0.2)",
      "--text-primary": "#FEFCE8",
      "--text-muted":   "#FDE68A",
      "--accent":       "#FACC15",
      "--accent-hover": "#EAB308",
      "--accent-glow":  "rgba(250,204,21,0.2)",
      "--glow-color":   "rgba(250,204,21,0.25)",
    },
  },
  glass: {
    label: "Glassmorphism",
    preview: ["#0F172A", "#38BDF8", "#1E293B"],
    vars: {
      "--bg-page":      "#0F172A",
      "--bg-sidebar":   "rgba(30,41,59,0.7)",
      "--bg-card":      "rgba(30,41,59,0.5)",
      "--bg-input":     "rgba(15,23,42,0.6)",
      "--border":       "rgba(148,163,184,0.15)",
      "--text-primary": "#F1F5F9",
      "--text-muted":   "#94A3B8",
      "--accent":       "#38BDF8",
      "--accent-hover": "#0EA5E9",
      "--accent-glow":  "rgba(56,189,248,0.2)",
      "--glow-color":   "rgba(56,189,248,0.2)",
    },
  },
  minimal: {
    label: "Minimal White",
    preview: ["#F8FAFC", "#6366F1", "#FFFFFF"],
    vars: {
      "--bg-page":      "#F8FAFC",
      "--bg-sidebar":   "#FFFFFF",
      "--bg-card":      "#FFFFFF",
      "--bg-input":     "#F1F5F9",
      "--border":       "rgba(0,0,0,0.08)",
      "--text-primary": "#0F172A",
      "--text-muted":   "#64748B",
      "--accent":       "#6366F1",
      "--accent-hover": "#4F46E5",
      "--accent-glow":  "rgba(99,102,241,0.1)",
      "--glow-color":   "rgba(99,102,241,0.1)",
    },
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState(
    () => localStorage.getItem("finsight_theme") || "default"
  );
  const [accentColor, setAccentColor] = useState(
    () => localStorage.getItem("finsight_accent") || ""
  );

  // Apply CSS vars to :root whenever theme or accent changes
  const applyTheme = useCallback((key, accent) => {
    const theme = THEMES[key] || THEMES.default;
    const root  = document.documentElement;
    Object.entries(theme.vars).forEach(([k, v]) => root.style.setProperty(k, v));
    if (accent) {
      root.style.setProperty("--accent",       accent);
      root.style.setProperty("--accent-hover", accent);
    }
    // body background
    document.body.style.background = theme.vars["--bg-page"];
    document.body.style.color      = theme.vars["--text-primary"];
  }, []);

  useEffect(() => {
    applyTheme(themeKey, accentColor);
  }, [themeKey, accentColor, applyTheme]);

  function switchTheme(key) {
    setThemeKey(key);
    localStorage.setItem("finsight_theme", key);
    applyTheme(key, accentColor);
  }

  function updateAccent(color) {
    setAccentColor(color);
    localStorage.setItem("finsight_accent", color);
    const root = document.documentElement;
    root.style.setProperty("--accent",       color);
    root.style.setProperty("--accent-hover", color);
  }

  const isLight = themeKey === "minimal";

  return (
    <ThemeContext.Provider value={{ themeKey, accentColor, switchTheme, updateAccent, isLight, THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
