"use client"
import { Alert, Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowsProp, GridValidRowModel, GridValueGetterParams } from '@mui/x-data-grid';

import Swal from 'sweetalert2';
import Table from "@/components/EditableTable";
import { InputVatService } from "@/services/DatabaseServices";
import { error } from "console";
export default function Bank() {
    const TableComponentRef = useRef(null);
    const [editable, setEditable] = useState(false)
    const [forceUpdateFlag, setForceUpdateFlag] = useState(0);
    const [errors, setErrors] = useState([]);
    const handleEditButton = () => {
        setEditable(!editable)
    }

    const handleSaveButton = async (newRow: GridRowModel) => {
        let res;
        if (typeof newRow.id === 'number') {
            res = await InputVatService.put(newRow)
        } else {
            delete newRow.id
            res = await InputVatService.post(newRow)
        }

        if (res == 200) {
            Swal.fire("Saved!", "", "success");

            setErrors(() => [])
            fetchData()
            setTimeout(() => {
                setForceUpdateFlag((prev) => prev + 1);
            }, 500);
        } else { 
            setErrors(res.response.data.errors)
            // Swal.fire("Changes are not saved", res.response.data.errors.code[0] + 'and' + res.response.data.errors.name[0], "error"); 
        }
    }
    const handleDeleteButton = (id: GridRowId) => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then(async (result) => {
            let response;
            if (result.isConfirmed) {
                response = await InputVatService.delete({ id })
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

    const handleCancelButton = (id: GridRowId) => {
        setErrors(() => [])
        setTimeout(() => {
            setForceUpdateFlag((prev) => prev + 1);
        }, 500);
    }

    const [rows, setRows] = useState<GridRowsProp>([])
    // let rows : GridRowsProp = []
    const fetchData = async () => {
        try {
            let res = await InputVatService.getAll()
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

    useEffect(() => {
        fetchData()
    }, [])

    const columns: GridColDef[] = [
        { field: 'effectivity_date', headerName: 'Effectivity Date', width: 180, editable: true, type: 'date',
        valueFormatter: (params) => {
            // Format the date before displaying
            const date = new Date(params.value);
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
          },
    },
        { field: 'rate', headerName: 'Vat Rate', width: 180, editable: true, type: 'number'}
    ]; 

    return (
        <div key={forceUpdateFlag}>

            {errors && Object.values(errors).map((error, index) => (
                <Alert severity="error">
                    <ul>

                        <li key={index}>
                            <b>• {error}</b>
                        </li>
                    </ul>
                </Alert>
            ))}

            <Divider sx={{ marginTop: "10px" }} />
            <Box >
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Table onCancel={handleCancelButton} onSave={handleSaveButton} onDelete={handleDeleteButton} parentRef={TableComponentRef} _cols={columns} _rows={rows} />
                    </Grid>
                </Grid>
            </Box>
        </div> 
    )
}