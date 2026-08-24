import { Theme } from "./types";

export const ThemeToggle = ({
  theme,
  onSetTheme,
}: {
  theme: Theme;
  onSetTheme: (theme: Theme) => void;
}) => (
  <div className="absolute top-4 right-4">
    <div
      className="border-primary-200 bg-primary-50 flex rounded-lg border p-1
        shadow-md dark:border-stone-500 dark:bg-stone-700"
    >
      {(["light", "dark", "system"] as const).map((t) => (
        <button
          key={t}
          onClick={() => onSetTheme(t)}
          className={`cursor-pointer rounded-md border px-3 py-1 text-sm
          font-medium transition-colors ${
            theme === t
              ? "border-red-500/70 dark:bg-stone-800"
              : `text-primary-800 hover:bg-primary-200 border-transparent
                dark:hover:bg-stone-400`
          }`}
        >
          <span className="sr-only">
            Switch to {t.charAt(0).toUpperCase() + t.slice(1)} Theme
          </span>
          {t === "light" && "☀️"}
          {t === "dark" && "🌙"}
          {t === "system" && "💻"}
        </button>
      ))}
    </div>
  </div>
);
