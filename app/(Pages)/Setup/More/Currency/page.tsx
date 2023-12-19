"use client"
import CustomButtons from "@/components/CustomButtons";
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

import Swal from 'sweetalert2';
import Table from "@/components/Table";
export default function Currency() { 
    const [editable, setEditable] = useState(false)

    const handleEditButton = () => {
        setEditable(!editable)
    }

    const handleSaveButton = () => {
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Saved!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    return (
        <>
            

            <Divider sx={{ marginTop: "10px" }} />
            <Box>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <Table />
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}