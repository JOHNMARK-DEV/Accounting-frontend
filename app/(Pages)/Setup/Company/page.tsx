"use client"
import CustomButtons from "@/components/CustomButtons";
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { CompanySetupService } from "@/services/DatabaseServices";
import dayjs from "dayjs";


const schema = z.object({  
    name: z.string(),
    address: z.string(),
    email: z.string(),
    tel_no: z.string(),
    fax_no: z.string(),
    tin: z.string(),
    begbal_date: z.date(),

    retained_earning: z.string(),
    foreign_exchange: z.string(),
    restatement: z.string(),
    rdo_code: z.string(),
    zip_code: z.string(),
    based_currency: z.string(),
    exchange_rate_decimal: z.number(),
    transaction_decimal: z.number(),

    is_multi_currency: z.boolean(),
    is_auto_number: z.boolean(),
})
interface CompanyData extends z.infer<typeof schema> { }
export default function Company() { 
    const today = dayjs().format('YYYY-MM-DD'); 
    const [editable, setEditable] = useState(false) 
    
    const handleEditButton = () => {
        setEditable(!editable)
    }

    const handleCancelButton = () => {
        setEditable(!editable)
    }

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => { 
        let values = data
        values.id = 1 

        values.is_multi_currency = data.is_multi_currency ? 1 : 0
        values.is_auto_number = data.is_auto_number ? 1 : 0 

        CompanySetupService.put(values)
    }

    // let rows: CompanyData;
    const [rows, setRows] = useState<CompanyData>()
    // let rows : GridRowsProp = []

    useEffect(() => {
        const fetchData = async () => {
            try { 
                let res = await CompanySetupService.getAll()
                if (res.status == 200) {
                    // rows = res.data
                    await setRows(() => res.data)


                    // if (res.data.length != 0) { 
                    //     rows = await res.data
                    // }
                    // setEditable(false)
                    // setEditable(true)
                    // setEditable(false)
                    // setTimeout(() => {
                    //     console.log(rows?.name)
                    // }, 1000);
                    console.log(rows)

                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    if (rows?.name == undefined) { 
        return <p>Loading...</p>; // You can replace this with a loading spinner or any other loading indicator
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>

            {
                !editable ?
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#757de8' }}
                        onClick={(() => handleEditButton())}
                    >
                        Edit
                    </Button>
                    :
                    <Stack spacing={2} direction="row">
                        <Button variant="contained" type="submit" style={{ backgroundColor: 'green' }}>
                            Save
                        </Button>
                        <Button variant="contained" onClick={() => handleCancelButton()} style={{ backgroundColor: 'red' }} >
                            Cancel
                        </Button>
                    </Stack>
            }


            <Divider sx={{ marginTop: "10px" }} />
            <Box>
                <Grid container spacing={2} >
                    <Grid item xs={6}>  
                        <TextField fullWidth label="Name"  {...register('name', { value: rows?.name })} variant="standard" color="primary" disabled={!editable} />
                        {errors.name?.message && (
                            <p style={{ color: 'red' }}>{errors.name?.message.toString() }</p>
                        )}
                        <TextField fullWidth label="Address" {...register('address', { value: rows?.address })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Email" {...register('email', { value: rows?.email })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Tel no." {...register('tel_no', { value: rows?.tel_no })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Fax no." {...register('fax_no', { value: rows?.fax_no })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Tin" {...register('tin', { value: rows?.tin })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Beginning balance date" {...register('begbal_date', { value: rows?.begbal_date })}  InputLabelProps={{ shrink: true }}  variant="standard" type="date" color="primary" disabled={!editable} />
                        {errors.begbal_date?.message && (
                            <p style={{ color: 'red' }}>{errors.begbal_date?.message.toString() }</p>
                        )}
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Retained Earning" {...register('retained_earning', { value: rows?.retained_earning })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Foreign Exchange" {...register('foreign_exchange', { value: rows?.foreign_exchange })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Restatement" {...register('restatement', { value: rows?.restatement })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="RDO Code" {...register('rdo_code', { value: rows?.rdo_code })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Zip code" {...register('zip_code', { value: rows?.zip_code })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Based Currency" {...register('based_currency', { value: rows?.based_currency })} variant="standard" color="primary" disabled={!editable} />
                        <TextField fullWidth label="Decimal Places for exchange rate" {...register('exchange_rate_decimal', { value: rows?.exchange_rate_decimal })} variant="standard" color="primary" disabled={!editable} />
                        {errors.exchange_rate_decimal?.message && (
                            <p style={{ color: 'red' }}>{errors.exchange_rate_decimal?.message.toString() }</p>
                        )}
                        <TextField fullWidth label="Decimal Places for transaction" {...register('transaction_decimal', { value: rows?.transaction_decimal })} variant="standard" color="primary" disabled={!editable} />
                        {errors.exchange_rate_decimal?.message && (
                            <p style={{ color: 'red' }}>{errors.exchange_rate_decimal?.message.toString() }</p>
                        )}
                    </Grid>
                </Grid>
                <Grid container >
                    <Grid item xs={6}>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked  {...register('is_multi_currency', { value: rows?.is_multi_currency })} />} label="Peso Currency Only" />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked {...register('is_auto_number', { value: rows?.is_auto_number })} />} label="Auto Number" />
                        </FormGroup>
                    </Grid>
                    
                </Grid>
            </Box>
        </form>
    )
}