import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppShell } from '@/components/layout/AppShell';

// Pages
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Students from '@/pages/Students';
import Courses from '@/pages/Courses';
import Schedule from '@/pages/Schedule';
import Attendance from '@/pages/Attendance';
import Rooms from '@/pages/Rooms';
import Notifications from '@/pages/Notifications';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />
      
      <Route path="/dashboard">
        <AppShell><Dashboard /></AppShell>
      </Route>
      <Route path="/students">
        <AppShell><Students /></AppShell>
      </Route>
      <Route path="/courses">
        <AppShell><Courses /></AppShell>
      </Route>
      <Route path="/schedule">
        <AppShell><Schedule /></AppShell>
      </Route>
      <Route path="/attendance">
        <AppShell><Attendance /></AppShell>
      </Route>
      <Route path="/rooms">
        <AppShell><Rooms /></AppShell>
      </Route>
      <Route path="/notifications">
        <AppShell><Notifications /></AppShell>
      </Route>
      <Route path="/settings">
        <AppShell><Settings /></AppShell>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
