'use client';

import { ProfileMenu } from './app-profile-menu';
import { SidebarTrigger } from '~/components/ui/sidebar';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(
  () => import('~/components/pattern/ThemeToggle').then((c) => c.ThemeToggle),
  { ssr: false },
);

export const Header = () => (
  <header className="bg-background/95 text-foreground justify-between sticky top-0 z-30 flex h-12 px-4 w-full backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] border-b border-border/40 items-center">
    <SidebarTrigger />

    <div className="flex gap-2 items-center">
      <ThemeToggle />
      <ProfileMenu />
    </div>
  </header>
);
