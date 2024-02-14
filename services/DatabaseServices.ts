 
import { GridRowId } from '@mui/x-data-grid';
import axiosInstance from './axiosInstance'
class DatabaseServices {
    _moduleName: String | any;
    constructor(moduleName: String) {
        this._moduleName = moduleName;
    }

    getAll = async () => {
        const res = await axiosInstance.get(this._moduleName).then((res) => {
            return res;
        });
        return res;
    }

    getOne = async (column:string = "id",id:string | number) => {
        await axiosInstance.get(this._moduleName);
    }

    post = async (insert: any) => {
        const res = await axiosInstance.post(this._moduleName, insert)
        .then(async res => {
            return await res.status
        })
        .catch(async err => {
            return await err
        });
        return res
    }

    put = async (update: any) => {
        const res = await axiosInstance.put(this._moduleName,update).then(res => {
            return res.status
        }); 
        return res;
    }

    delete = async (
        {
            id,  
            columnName = "id"
        }: {
            id: string | number | any | GridRowId, 
            columnName?: string
        }
    ) => {
        const res = await axiosInstance.delete(this._moduleName+"?id="+id).then(res => {
            return res.status
        });
        return res;
    }

}
export const BookService = new DatabaseServices("BookSetup");
export const ChartclassService = new DatabaseServices("ChartclassSetup");
export const ChartgroupService = new DatabaseServices("ChartgroupSetup");
export const ChartofaccountService = new DatabaseServices("ChartofaccountSetup");

export const AgingService = new DatabaseServices("AgingSetup"); 
export const BankService = new DatabaseServices("BankSetup");
export const IndustryService = new DatabaseServices("IndustrySetup");
export const CurrencyService = new DatabaseServices("CurrencySetup"); 
export const CategoryService = new DatabaseServices("CategorySetup"); 
export const DepartmentService = new DatabaseServices("DepartmentSetup"); 
export const ProjectService = new DatabaseServices("ProjectSetup"); 
export const TermsService = new DatabaseServices("TermsSetup");  
export const InputVatService = new DatabaseServices("InputvatSetup");  
export const OutputVatService = new DatabaseServices("OutputvatSetup"); 
export const ExpandedtaxService = new DatabaseServices("ExpandedtaxSetup"); 
export const FinaltaxService = new DatabaseServices("FinaltaxSetup"); 

export const CompanySetupService = new DatabaseServices("CompanySetup"); 
export const BusinesspartnerSetupService = new DatabaseServices("BusinesspartnerSetup"); 











