// store.js
import { InputvatService } from '@/services/DatabaseServices';
import create from 'zustand';

const useState = create((set) => {
  return {
      counter: 0,
      get: async () => {
          const { data } = await InputvatService.getAll();
          set({
              counter: data.counter,
          });
      },
      addTodo: (text :any) =>
        set((state :any) => ({
            todos: [
                ...state.todos,
                {
                    id: Date.now(),
                    text,
                    completed: false,
                },
            ],
        })),
  };
});

export default useState;
