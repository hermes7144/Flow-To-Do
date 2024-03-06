import { getPomodoro, setPomodoro } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function usePomodoro() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const pomodoroQuery = useQuery({
    queryKey: ['pomodoro', uid],
    queryFn: () => getPomodoro(uid),
  });

  const { data: pomodoro } = pomodoroQuery;

  const addPomodoro = useMutation({
    mutationFn: async () => {
      await setPomodoro(uid, pomodoro);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['pomodoro', uid]);
    },
  });

  return { pomodoroQuery, addPomodoro };
}
