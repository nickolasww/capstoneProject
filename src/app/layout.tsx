import { Outlet } from 'react-router-dom';
import { AppBoundary } from '@/app/_components/ui/app-boundry';
import { ThemeProvider } from '@/app/_components/providers/theme';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AppBoundary>
        <div className="min-h-screen">
          <Outlet />
        </div>
      </AppBoundary>
    </ThemeProvider>
  );
}
