// store.js
import { BookService, CurrencyService } from '@/services/DatabaseServices'; 
import { create } from 'zustand';

const useStore = create((set) => {
  return { 
      BooksList:[],
      getBooks: async () =>{
        try {
          const data = await BookService.getAll();
          set({BooksList:data})
        } catch (error) { 
          console.error('Error fetching books:', error);
        }
      },
      CurrencyList:[],
      getCurrency: async () =>{
        try {
          const data = await CurrencyService.getAll();
          set({CurrencyList:data})
        } catch (error) { 
          console.error('Error fetching books:', error);
        }
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

export default useStore;
