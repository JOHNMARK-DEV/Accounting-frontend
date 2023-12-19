"use client"
import CustomButtons from "@/components/CustomButtons";
import { Box, Checkbox, Divider, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

import Swal from 'sweetalert2';
export default function Company() {
    const buttonNames = ['Edit'];
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
            <CustomButtons
                ButtonNames={buttonNames}
                onClickEdit={() => handleEditButton()}
                onClickSave={() => handleSaveButton()}
            />

            <Divider sx={{ marginTop: "10px" }} />
            <Box>
                <Grid container spacing={2} >
                    <Grid item xs={6}>
                        <TextField fullWidth label="Company code" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Name" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Address" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Email" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Tel no." variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Fax no." variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Tin" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Beginning balance date" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="standard primary" variant="standard" color="primary" disabled={!editable} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Retained Earning" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Foreign Exchange" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Restatement" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="RDO Code" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Zip code" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Based Currency" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Decimal Places for exchange rate" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Decimal Places for transaction" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Closing / Restatement Project" variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Closing / Restatement Department" variant="standard" color="primary" disabled={!editable} />
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Peso Currency Only" />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Auto Number" />
                        </FormGroup>
                    </Grid>
                </Grid>
            </Box>

        </>
    )
}