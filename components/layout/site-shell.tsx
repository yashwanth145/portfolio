import { GridScanIntro } from "@/components/react-bits/grid-scan-intro";
import { LightRaysBackground } from "@/components/react-bits/light-rays-background";
import { PlayGameFab } from "@/components/layout/play-game-fab";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen text-foreground">
      <GridScanIntro />
      <LightRaysBackground />
      <SiteHeader />
      <main className="relative z-10">{children}</main>
      <SiteFooter />
      <PlayGameFab />
    </div>
  );
}
