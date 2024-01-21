import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTodos ,addNewTodo ,removeTodo} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useTodos() {
    const { uid }= useAuthContext();
    const queryClient = useQueryClient();
    const productsQuery =  useQuery({queryKey:['todos'], queryFn: () => getTodos(uid)});
    const addTodo = useMutation({
        mutationFn: (input) => {
          addNewTodo( uid, input );
        },
        onSuccess: () => {
          queryClient.invalidateQueries(['todos']);
        },
      });
      const deleteTodo =useMutation({
        mutationFn: ({todoId}) => {
        removeTodo(uid, todoId);
        },
        onSuccess: () => {
        queryClient.invalidateQueries(['todos']);
        },
    });

      return {productsQuery, addTodo, deleteTodo};
}
