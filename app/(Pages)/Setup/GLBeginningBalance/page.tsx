"use client"
import { Alert, Box, Button, Checkbox, Collapse, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Icon, InputLabel, List, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowsProp, GridValidRowModel, GridValueGetterParams } from '@mui/x-data-grid';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/material/Autocomplete';
import CustomButtons from "@/components/Buttons/CustomButtons";
import Swal from 'sweetalert2';
import Table from "@/components/Tables/SelectableTable";
import { ChartclassService, ChartgroupService, ChartofaccountService } from "@/services/DatabaseServices"; 
import SettingsModal from '@/components/Modals/SettingsModal'

interface ISettings {
    Begbal_date?: String,
    Book?: {Value:'',Label:""},
    Currency?: {Value:'',Label:""},
}
export default function ChartofAccount() {
    const TableComponentRef = useRef(null);
    const [settingsValue,setsettingsValue] = useState<ISettings>({})
    const [ModalSettings, openModalSettings] = useState(true)
    const [openModal, setOpenModal] = useState(false)
    const [editable, setEditable] = useState(false)
    const [forceUpdateFlag, setForceUpdateFlag] = useState(0);
    const handleEditButton = () => {
        setEditable(!editable)
    }

    const handleAddButton = () => {
        setOpenModal(!openModal);
    }

    const handleDeleteButton = (id: GridRowId) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then(async (result) => {
            let response;
            if (result.isConfirmed) {
                response = await ChartclassService.delete({ id })
                if (response == 200) {
                    Swal.fire("Saved!", "", "success");
                    fetchData()
                    setTimeout(() => {
                        setForceUpdateFlag((prev) => prev + 1);
                    }, 500);
                }
            }
        });
    }



    const [rows, setRows] = useState<GridRowsProp>([])
    const fetchData = async () => {
        try {
            let res = await ChartofaccountService.getAll()
            if (res.status == 200) {
                if (res.data.length === 0) {
                    setRows(() => [])
                } else {
                    setRows(() => res.data)
                    setForceUpdateFlag((prev) => prev + 1);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const selectedFilter = (data: any) => {
        console.log(data)
        setsettingsValue({Book: data.Book, Currency: data.Currency})
    }

    useEffect(() => {
        if(settingsValue.Book?.Label == "" && settingsValue.Currency?.Label == ""){ 
            fetchData()
        }
    }, [])

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', width: 130 },
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'debit', headerName: 'Debit', width: 200 },
        { field: 'credit', headerName: 'Credit', width: 200 },
        { field: 'debit_based', headerName: 'Debit based', width: 200 },
        { field: 'credit_based', headerName: 'Credit based', width: 200 },
        { field: 'project_unit', headerName: 'Project Unit', width: 200 },
        { field: 'department', headerName: 'Department', width: 200 },
        { field: 'book_unit', headerName: 'Book Unit', width: 200 },
    ]

    const chartValidation = [
        { id: 1, title: 'Bank / Cash' },
        { id: 2, title: 'Account Receivable' },
        { id: 3, title: 'Account Payable' },
        { id: 4, title: 'Ewt' },
        { id: 5, title: 'Final Tax' },
        { id: 6, title: 'Input Vat' },
        { id: 7, title: 'Output Vat' },
        { id: 8, title: 'Prepayment' },
        { id: 9, title: 'Fixed Asset' },
        { id: 10, title: 'Gain or loss' },
        { id: 11, title: 'Sales Discount' },
        { id: 12, title: 'Purchase Discount' },
    ];

    return (
        <>
            <div>
                <Grid container>
                    <Grid item xs={3}>
                        <CustomButtons isShowSaveBtn={false} onClickAdd={() => handleAddButton()} ButtonNames={['Add', 'Edit', 'Delete', 'Print']} />
                    </Grid>
                    <Grid item xs={9} className="d-flex flex-row"> 
                        <InputLabel className="font-bold">Selected Book : {settingsValue.Book?.Label}</InputLabel>
                        <InputLabel className="font-bold">Selected Currency :  {settingsValue.Currency?.Label} </InputLabel>
                    </Grid>
                </Grid>

                <Divider sx={{ marginTop: "10px" }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Table onDelete={handleDeleteButton} parentRef={TableComponentRef} _cols={columns} _rows={rows} />
                    </Grid>
                </Grid>
            </div>
            <SettingsModal onSelectedValues={selectedFilter} openModal={ModalSettings} />
        </>
    )

}