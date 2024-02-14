// store.js
import { BookService, BusinesspartnerSetupService, ChartofaccountService, CurrencyService, ProjectService } from '@/services/DatabaseServices';
import { number } from 'zod';
import { create } from 'zustand';

const useStore = create((set) => {
  return {
    BooksList: [],
    getBooks: async () => {
      try {
        const res = await BookService.getAll();
        set({ BooksList: res.data  })
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    },
    CurrencyList: [],
    getCurrency: async () => {
      try {
        const res = await CurrencyService.getAll();
        set({ CurrencyList: res.data  })
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }, 
    BusinessPartnerList: [],
    getBusinessPartner: async () => {
      try {
        const res = await BusinesspartnerSetupService.getAll();
        set({ BusinessPartnerList: res.data })  
      } catch (error) {
        console.error('Error fetching BusinessPartnerList:', error);
      }
    }, 
    ProjectList: [],
    getProject: async () => {
      try {
        const res = await ProjectService.getAll();
        set({ ProjectList: res.data })
      } catch (error) {
        console.error('Error fetching getProject:', error);
      }
    },  
    ChartofAccountList: [],
    getChartofAccountList: async () => {
      try {
        const res = await ChartofaccountService.getAll();
        set({ ChartofAccountList: res.data })
      } catch (error) {
        console.error('Error fetching getProject:', error);
      }
    },  

    SelectedBook:{
      id:number,
      code:String,
      name:String
    },
    setSelectedBook : (data: any) =>{
      set({ SelectedBook: data })
    }

  };
});

export default useStore;
