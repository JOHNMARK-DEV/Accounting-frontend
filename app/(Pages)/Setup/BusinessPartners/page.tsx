"use client"
import { Alert, Box, Button, Checkbox, Collapse, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Icon, InputLabel, List, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowsProp, GridValidRowModel, GridValueGetterParams } from '@mui/x-data-grid';
 
import CustomButtons from "@/components/CustomButtons"; 
import Table from "@/components/SelectableTable";   
import BusinessPartnersModal from "@/components/Modals/BusinessPartnersModal";
export default function ChartofAccount() {
    const TableComponentRef = useRef(null); 
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
       
    }



    const [rows, setRows] = useState<GridRowsProp>([])
    const fetchData = async () => {
        
    }
 
    useEffect(() => {
        
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
                </Grid>

                <Divider sx={{ marginTop: "10px" }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Table onDelete={handleDeleteButton} parentRef={TableComponentRef} _cols={columns} _rows={rows} />
                    </Grid>
                </Grid>
                <BusinessPartnersModal />
            </div> 
        </>
    )

}