
import { useRouter } from 'next/navigation'; 

type Route = {
    path: string; 
};

type Routes = {
    [key: string]: Route;
};

const routes: Routes = {
    CompanySetup: {
        path: '/Setup/Company', 
    },
    CurrencySetup: {
        path: '/Setup/Currency', 
    },

};
export const getRoutePath = (routeName: string) => { 
 
   const module = routes[routeName]; 
   return module.path
};