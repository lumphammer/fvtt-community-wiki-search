import { useState, SubmitEvent, useEffect } from "react";
import { ensureTheme, Theme } from "./types";
import { ThemeToggle } from "./ThemeToggle";

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState<Theme>(
    ensureTheme(localStorage.getItem("theme") as Theme),
  );

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.toggle("dark", systemTheme === "dark");
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    const encodedSearchTerm = encodeURIComponent(searchTerm.trim());
    const searchUrl = `https://duckduckgo.com/?q=site%3Ahttps%3A%2F%2Ffoundryvtt.wiki+%22${encodedSearchTerm}%22`;

    window.open(searchUrl, "_self");
  };

  return (
    <div
      className="bg-primary-100 relative flex min-h-screen items-center
        justify-center p-8 dark:bg-stone-900"
    >
      <ThemeToggle onSetTheme={setTheme} theme={theme} />
      <div className="mx-auto w-full max-w-3xl">
        <div
          className="bg-primary-50 text-primary-700 rounded-lg border-t-2
            border-l-2 border-white p-6 shadow-md dark:border-stone-700
            dark:bg-stone-800 dark:text-stone-300"
        >
          <div className="mb-6 text-center">
            <h2 className="font-blackletter mb-2 text-5xl font-normal">
              Search the{" "}
              <a
                href="https://foundryvtt.wiki/en/home"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 underline hover:text-red-500
                  dark:text-red-500 dark:hover:text-red-400"
              >
                Foundry VTT Community Wiki
              </a>
            </h2>
          </div>
          <p className="my-6 text-center">Opens search results in DuckDuckGo</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="search" className="sr-only">
                Search Term
              </label>
              <input
                id="search"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="e.g., character sheets, macros, modules..."
                className="border-primary-300 w-full rounded-lg border bg-white
                  px-4 py-3 shadow-sm transition-all outline-none hover:shadow
                  focus:border-red-600 focus:ring-1 focus:ring-red-600
                  dark:border-stone-600 dark:bg-stone-700 dark:text-stone-100
                  dark:placeholder-stone-400 dark:focus:border-red-500
                  dark:focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={!searchTerm.trim()}
              className="hover:bg-primary-800 disabled:hover:bg-primary-700
                w-full cursor-pointer rounded-lg bg-red-700 px-4 py-3
                font-semibold text-white shadow-sm transition-colors
                hover:shadow disabled:cursor-not-allowed disabled:opacity-50
                dark:bg-red-700 dark:hover:bg-red-800
                dark:disabled:hover:bg-red-700"
            >
              Search Wiki
            </button>
          </form>
          <aside
            className="text-primary-500 mt-6 text-center text-sm
              dark:text-stone-500"
          >
            (Not affiliated with Foundry VTT or the Foundry VTT Community Wiki.){" "}
            <a
              href="https://github.com/lumphammer/fvtt-community-wiki-search"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 underline hover:text-red-500
                dark:text-red-500 dark:hover:text-red-400"
            >
              GitHub
            </a>
          </aside>
        </div>
      </div>
    </div>
  );
}
