import { createContext, useContext, useState } from 'react';

const PomodoroContext = createContext();

export const usePomodoroContext = () => {
  return useContext(PomodoroContext);
};
export function PomodoroProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [runningTodo, setRunningTodo] = useState(null);
  const startPomodoro = (todo) => {
    todo && setRunningTodo(todo);
    setIsRunning(true);
  };

  const stopPomodoro = () => {
    setIsRunning(false);
  };

  return (
    <PomodoroContext.Provider
      value={{
        runningTodo,
        setRunningTodo,
        isRunning,
        startPomodoro,
        stopPomodoro,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}
