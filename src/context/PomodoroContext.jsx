import { createContext, useContext, useState } from 'react';

const PomodoroContext = createContext();

export function PomodoroProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [runningTodo, setRunningTodo] = useState(null);

  return (
    <PomodoroContext.Provider
      value={{
        runningTodo,
        setRunningTodo,
        isRunning,
        setIsRunning,
      }}>
      {children}
    </PomodoroContext.Provider>
  );
}

export const usePomodoroContext = () => {
  return useContext(PomodoroContext);
};
