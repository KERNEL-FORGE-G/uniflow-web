import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { AppShell } from '@/components/layout/AppShell';
import { AdminShell } from '@/components/layout/AdminShell';

// Public pages
import Landing from '@/pages/Landing';
import Auth from '@/pages/Auth';
import Register from '@/pages/Register';

// Student pages
import Dashboard from '@/pages/Dashboard';
import Courses from '@/pages/Courses';
import Schedule from '@/pages/Schedule';
import Attendance from '@/pages/Attendance';
import Notifications from '@/pages/Notifications';
import Profile from '@/pages/Profile';
import Notes from '@/pages/Notes';
import Devoirs from '@/pages/Devoirs';
import Messages from '@/pages/Messages';
import VideoConference from '@/pages/VideoConference';
import Settings from '@/pages/Settings';
import Resources from '@/pages/Resources';
import Support from '@/pages/Support';

// Admin pages
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminUsers from '@/pages/admin/AdminUsers';
import AdminCourses from '@/pages/admin/AdminCourses';

import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      {/* Public */}
      <Route path="/" component={Landing} />
      <Route path="/auth" component={Auth} />
      <Route path="/register" component={Register} />

      {/* Admin — wrapped in AdminShell */}
      <Route path="/admin/dashboard"><AdminShell><AdminDashboard /></AdminShell></Route>
      <Route path="/admin/users"><AdminShell><AdminUsers /></AdminShell></Route>
      <Route path="/admin/courses"><AdminShell><AdminCourses /></AdminShell></Route>

      {/* Authenticated — wrapped in AppShell */}
      <Route path="/dashboard"><AppShell><Dashboard /></AppShell></Route>
      <Route path="/courses"><AppShell><Courses /></AppShell></Route>
      <Route path="/schedule"><AppShell><Schedule /></AppShell></Route>
      <Route path="/attendance"><AppShell><Attendance /></AppShell></Route>
      <Route path="/notifications"><AppShell><Notifications /></AppShell></Route>
      <Route path="/profile"><AppShell><Profile /></AppShell></Route>
      <Route path="/notes"><AppShell><Notes /></AppShell></Route>
      <Route path="/devoirs"><AppShell><Devoirs /></AppShell></Route>
      <Route path="/messages"><AppShell><Messages /></AppShell></Route>
      <Route path="/video"><AppShell><VideoConference /></AppShell></Route>
      <Route path="/resources"><AppShell><Resources /></AppShell></Route>
      <Route path="/settings"><AppShell><Settings /></AppShell></Route>
      <Route path="/support"><AppShell><Support /></AppShell></Route>

      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
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
