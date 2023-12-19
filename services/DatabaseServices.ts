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

export const BankService = new DatabaseServices("BankSetup");
export const CurrencyService = new DatabaseServices("UserSetup");

