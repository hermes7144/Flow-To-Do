import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { PomodoroProvider } from './context/PomodoroContext';
import { CategoryProvider } from './context/CategoryContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
})
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Navbar />
        <CategoryProvider>
          <PomodoroProvider>
            <Outlet />
          </PomodoroProvider>
        </CategoryProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
