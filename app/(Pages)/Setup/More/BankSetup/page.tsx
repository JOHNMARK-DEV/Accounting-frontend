"use client"
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowsProp, GridValidRowModel, GridValueGetterParams } from '@mui/x-data-grid';

import Swal from 'sweetalert2';
import Table from "@/components/Table";
import { BankService } from "@/services/DatabaseServices";
export default function Bank() {
    const TableComponentRef = useRef(null);
    const [editable, setEditable] = useState(false)
    const [forceUpdateFlag, setForceUpdateFlag] = useState(0);

    const handleEditButton = () => {
        setEditable(!editable)
    }

    const handleSaveButton = (newRow: GridRowModel) => {

        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            let res;
            if (result.isConfirmed) {
                if (typeof newRow.id === 'number') {
                    res = await BankService.put(newRow)
                } else {
                    delete newRow.id
                    res = await BankService.post(newRow)
                }
                
                if (res == 200) {
                    Swal.fire("Saved!", "", "success");
                    fetchData()
                    setTimeout(() => {
                        setForceUpdateFlag((prev) => prev + 1);
                    }, 500);
                }else{ 
                    
                    console.log(res.response.data.errors.name)
                    Swal.fire("Changes are not saved", res.response.data.errors.code[0] + 'and' + res.response.data.errors.name[0], "error");
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }
    const handleDeleteButton = (id: GridRowId) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then(async (result) => {
            let response;
            if (result.isConfirmed) {
                response = await BankService.delete({ id })
                if (response == 200) {
                    Swal.fire("Saved!", "", "success");
                    fetchData()
                    setTimeout(() => {
                        setForceUpdateFlag((prev) => prev + 1);
                    }, 500);
                }
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const [rows, setRows] = useState<GridRowsProp>([])
    // let rows : GridRowsProp = []
    const fetchData = async () => {
        try {
            let res = await BankService.getAll()
            if(res.status == 200){
                if(res.data.length === 0){
                    setRows(() => [])  
                }else[
                    setRows(() => res.data)  
                ]
                
            } 
           
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', width: 180, editable: true },
        { field: 'name', headerName: 'Name', width: 180, editable: true }
    ];

    // if (rows.length === 0 rows[0].id === 0) { 
    //     return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
    // }

    return (
        <div key={forceUpdateFlag}>
            <Divider sx={{ marginTop: "10px" }} />
            <Box >
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Table onSave={handleSaveButton} onDelete={handleDeleteButton} parentRef={TableComponentRef} _cols={columns} _rows={rows} />
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}