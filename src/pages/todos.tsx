import axios from 'axios';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useResource } from '../hooks/use-resource';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodosPage() {
  const { register, handleSubmit, reset } = useForm<Todo>({
    defaultValues: { title: '', completed: false },
  });
  const { data: todos, invalidate } = useResource<Todo>('todos');

  async function createTodo(data: Todo) {
    reset();
    await toast.promise(
      axios.post('https://rube-servidor.netlify.app/api/public/todos', data),
      {
        loading: 'Speichern ...',
        error: 'Hoppla',
        success: 'Es gibt wieder mehr zu tun',
      }
    );
    invalidate();
  }

  return (
    <div>
      <h2>Todos</h2>
      <form onSubmit={handleSubmit(createTodo)}>
        <input {...register('title')} />
      </form>
      <ul>{todos && todos.map((t) => <li key={t.id}>{t.title}</li>)}</ul>
    </div>
  );
}
