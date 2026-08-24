const themes = ["light", "dark", "system"] as const;
export type Theme = (typeof themes)[number];

export const ensureTheme = (candidate: string | null): Theme =>
  candidate && themes.some((t) => t === candidate)
    ? (candidate as Theme)
    : "system";
