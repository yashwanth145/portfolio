"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
      // React 19 warns on inline <script> in component trees; this type avoids client re-execution.
      scriptProps={{ type: "text/template" }}
    >
      {children}
    </NextThemesProvider>
  );
}
