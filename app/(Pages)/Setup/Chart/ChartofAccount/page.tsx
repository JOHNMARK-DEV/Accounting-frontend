"use client"
import { Alert, Box, Button, Checkbox, Collapse, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, Icon, List, Radio, RadioGroup, Stack, TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowModel, GridRowModes, GridRowsProp, GridValidRowModel, GridValueGetterParams } from '@mui/x-data-grid';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Autocomplete from '@mui/material/Autocomplete';
import CustomButtons from "@/components/Buttons/CustomButtons";
import Swal from 'sweetalert2';
import Table from "@/components/Tables/SelectableTable";
import { ChartclassService, ChartgroupService, ChartofaccountService } from "@/services/DatabaseServices";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { Check, Label, Try } from "@mui/icons-material";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const today = dayjs().format('YYYY-MM-DD');
const schema = z.object({
    code: z.string(),
    name: z.string(),
    class_id: z.number(),
    group_id: z.number(),
    validation_id: z.number(),
    date: z.string(),
    is_input_vat_importation: z.boolean(),
    is_restatement: z.boolean(),
    is_unit_applicable: z.boolean(),
    is_no_compute: z.boolean(),
})

interface IChartofAccount extends z.infer<typeof schema> { }
export default function ChartofAccount() {
    const TableComponentRef = useRef(null);
    const [openModal, setOpenModal] = useState(false)
    const [editable, setEditable] = useState(false)
    const [forceUpdateFlag, setForceUpdateFlag] = useState(0);
    const [error, setErrors] = useState([]);
    const handleEditButton = () => {
        setEditable(!editable)
    }

    const handleAddButton = () => {
        setOpenModal(!openModal);
    }


    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: any) => {
        try {
            let res;
            let values = data
            values.is_input_vat_importation = data.is_input_vat_importation ? 1 : 0
            values.is_restatement = data.is_restatement ? 1 : 0
            values.is_unit_applicable = data.is_unit_applicable ? 1 : 0
            values.is_no_compute = data.is_no_compute ? 1 : 0 
 
            // if (typeof newRow.id === 'number') {
            //     res = await ChartgroupService.put(newRow)
            // } else {
            //     delete newRow.id
            //     res = ChartofaccountService.post(data)
            // }
            res = await ChartofaccountService.post(data)

            if (res == 200) {
                setOpenModal(!openModal)
                Swal.fire("Saved!", "", "success");
    
                setErrors(() => [])
                fetchData() 
            } else { 
                setErrors(res.response.data.errors)
                // Swal.fire("Changes are not saved", res.response.data.errors.code[0] + 'and' + res.response.data.errors.name[0], "error"); 
            }
        } catch (error) {
            console.log(error)
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

    const handleCancelButton = (id: GridRowId) => {
        setErrors(() => [])
        setTimeout(() => {
            setForceUpdateFlag((prev) => prev + 1);
        }, 500);
    }

    const handleDateChange = (selectedDate: any) => {
        setValue('date', dayjs(selectedDate.$d).format('YYYY-MM-DD'), { shouldValidate: true })
    }

    const handleAutocompleteChange = (event: any, value: any, dropdownName: string) => {
        let data: any;
        if (dropdownName == "class") {
            data = classRows.find(option => option.code + ' : ' + option.name === value);

            if (data.id) {
                setValue('class_id', data.id);
                console.log(data.id)
            }
        }

        if (dropdownName == "group") {
            data = groupRows.find(option => option.code + ' : ' + option.name === value);
            if (data.id > 0) {
                setValue('group_id', data.id);
            }
        }

        if (dropdownName == "validation") {
            data = chartValidation.find(option => option.title === value);
            if (data.id > 0) {
                setValue('validation_id', data.id);
                // Now 'selectedId' contains the id of the selected option
            }
        }

    }

    const [form, setForm] = useState<IChartofAccount>()
    const [rows, setRows] = useState<GridRowsProp>([])
    const [classRows, setclassRows] = useState<ISetup[]>([])
    const [groupRows, setgroupRows] = useState<ISetup[]>([])
    // let rows : GridRowsProp = []
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

    interface ISetup {
        'id': boolean,
        'code': string | any,
        'name': string | any
    }
    const fetchChartClass = async () => {
        try {
            let res = await ChartclassService.getAll()
            if (res.status == 200) {
                if (res.data.length === 0) {
                    setclassRows(() => [])
                } else {
                    setclassRows(() => res.data)
                    setForceUpdateFlag((prev) => prev + 1);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    const fetchChartGroup = async () => {
        try {
            let res = await ChartgroupService.getAll()
            if (res.status == 200) {
                if (res.data.length === 0) {
                    setgroupRows(() => [])
                } else {
                    setgroupRows(() => res.data)
                    setForceUpdateFlag((prev) => prev + 1);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData()
        fetchChartClass()
        fetchChartGroup()
    }, [])

    const columns: GridColDef[] = [
        { field: 'code', headerName: 'Code', width: 130 },
        { field: 'name', headerName: 'Name', width: 250 },
        {
            field: 'validation_id',
            headerName: 'Validation',
            width: 170,
            renderCell: (params) => (params.value > 0 ? chartValidation.filter(data => data.id == params.value)[0]?.title : ""),
        },
        {
            field: 'class_id', headerName: 'Class', width: 120,

            renderCell: (params) => (params.value > 0 ? classRows.filter(data => data.id == params.value)[0]?.name : ""),
        },
        {
            field: 'group_id',
            headerName: 'Group',
            width: 120,
            renderCell: (params) => (params.value > 0 ? groupRows.filter(data => data.id === params.value)[0]?.name : ""),
        },
        { field: 'date', headerName: 'Date', width: 110 },
        {
            field: 'is_input_vat_importation',
            headerName: 'For Importation',
            width: 170,
            renderCell: (params) => (params.value === 1 ? (<Checkbox disabled checked />) : (<Checkbox disabled />)),
        },
        {
            field: 'is_restatement',
            headerName: 'Restatement',
            width: 170,
            renderCell: (params) => (params.value === 1 ? (<Checkbox disabled checked />) : (<Checkbox disabled />)),
        },
        {
            field: 'is_unit_applicable',
            headerName: 'Unit Applicable',
            width: 170,
            renderCell: (params) => (params.value === 1 ? (<Checkbox disabled checked />) : (<Checkbox disabled />)),
        },
        {
            field: 'is_no_compute',
            headerName: 'No Compute',
            width: 170,
            renderCell: (params) => (params.value === 1 ? (<Checkbox disabled checked />) : (<Checkbox disabled />)),
        }

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
                <CustomButtons isShowSaveBtn={false} onClickAdd={() => handleAddButton()} ButtonNames={['Add', 'Edit', 'Delete', 'Print']} />
                <Divider sx={{ marginTop: "10px" }} />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Table onCancel={handleCancelButton} onDelete={handleDeleteButton} parentRef={TableComponentRef} _cols={columns} _rows={rows} />
                    </Grid>
                </Grid>
            </div>

            <Dialog
                fullWidth={true}
                open={openModal}
            >
                <DialogTitle>Add Chart</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi, corrupti consectetur obcaecati vel hic facere fugit itaque qui quo dolor?
                    </DialogContentText>

                    <form
                        onSubmit={handleSubmit(onSubmit)}>

                        <TextField id="outlined-basic" label="Code" variant="outlined" className="mt-4" fullWidth  {...register('code', { value: form?.code })} />
                        {errors.code?.message && (
                            <p style={{ color: 'red' }}>{errors.code?.message.toString()}</p>
                        )}
                        <TextField id="outlined-basic" label="Title" variant="outlined" className="mt-4" fullWidth  {...register('name', { value: form?.name })} />
                        <Autocomplete
                            className="mt-4"
                            disableClearable
                            onChange={(event, value) => handleAutocompleteChange(event, value, 'class')}
                            options={classRows.map((option) => option.code + ' : ' + option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chart Class"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            className="mt-4"
                            disableClearable
                            onChange={(event, value) => handleAutocompleteChange(event, value, 'group')}
                            options={groupRows.map((option) => option.code + ' : ' + option.name)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chart Group"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />
                        <Autocomplete
                            className="mt-4"

                            disableClearable
                            onChange={(event, value) => handleAutocompleteChange(event, value, 'validation')}
                            options={chartValidation.map((option) => option.title)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Validation"
                                    InputProps={{
                                        ...params.InputProps,
                                        type: 'search',
                                    }}
                                />
                            )}
                        />

                        <DatePicker label="Date" onChange={(selectedDate) => handleDateChange({ value: selectedDate })} />

                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Input Vat Importation"  {...register('is_input_vat_importation', { value: form?.is_input_vat_importation })} />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Restatement"  {...register('is_restatement', { value: form?.is_restatement })} />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="Unit Applicable" {...register('is_unit_applicable', { value: form?.is_unit_applicable })} />
                            <FormControlLabel control={<Checkbox defaultChecked />} label="No Compute" {...register('is_no_compute', { value: form?.is_no_compute })} />
                        </FormGroup>

                        <Stack spacing={2} direction="row" justifyContent="center"
                            alignItems="center"  >

                            <Button variant="contained" type="submit" style={{ backgroundColor: 'green' }}>
                                Save
                            </Button>
                            <Button variant="contained" onClick={() => setOpenModal(!openModal)} style={{ backgroundColor: 'red' }} >
                                Cancel
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    )

}