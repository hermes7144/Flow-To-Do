import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { PomodoroProvider } from './context/PomodoroContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <PomodoroProvider>
          <Outlet />
        </PomodoroProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
