import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos, addNewTodo, editTodo, removeTodo } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useTodos() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();
  const productsQuery = useQuery({
    queryKey: ['todos'],
    queryFn: () => getTodos(uid),
  });
  const addTodo = useMutation({
    mutationFn: (todo) => {
      addNewTodo(uid, todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
  const updateTodo = useMutation({
    mutationFn: (todo) => {
      editTodo(uid, todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (todoId) => {
      removeTodo(uid, todoId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });

  return { productsQuery, addTodo, updateTodo, deleteTodo };
}
