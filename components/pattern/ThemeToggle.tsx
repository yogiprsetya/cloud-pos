import { Button } from '~/components/ui/button';
import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  const Icon = isDark ? MoonStar : Sun;

  return (
    <Button size="icon" variant="ghost" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      <Icon className="w-5 h-5" />
    </Button>
  );
};
