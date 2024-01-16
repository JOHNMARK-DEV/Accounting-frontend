
import { Autocomplete, Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, FormControlLabel, FormGroup, Grid, Tab, Tabs, TextField } from "@mui/material";
import React, { forwardRef, useEffect, useState } from "react";

import { CategoryService } from "@/services/DatabaseServices";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const BusinessPartnersModal = () => {

    const schema = z.object({
        category_id: z.number(),
        code: z.string(),
        name: z.string()
    })

    interface BusinessPartnersData extends z.infer<typeof schema> { }
    const [BusinessPartnersData, setBusinessPartnersData] = useState<BusinessPartnersData>()
    const [category, setCategory] = useState([])
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');
    const [tabValue, setTabValue] = React.useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setTabValue(newValue)
    }

    const { register, handleSubmit,setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const fetchCategory = async () => {
        let res = await CategoryService.getAll()
        setCategory(() => res.data)
        console.log(res.data)
    }
    const onSubmit = (data: any) => {
        console.log(data)
    }

    const handleAutocompleteChange = (event: any, data: any, dropdownName: string) => {  
        setValue("category_id",data.Value)
    }

    useEffect(() => {
        fetchCategory()
    }, [])



    return (
        <>
            <Dialog open={true} fullWidth
                maxWidth={maxWidth}
            >
                <DialogTitle>Business Partner</DialogTitle>
                <Box paddingX={2}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Autocomplete
                            
                            onChange={(event, value) => handleAutocompleteChange(event, value, 'category_id')}
                            options={category ? category.map((cat: any) => ({ Label: cat.code, Value: cat.id })) : []}
                            getOptionLabel={(option: any) => option.Label} 
                            sx={{ width: 300, marginTop: "20px" }}
                            renderInput={(params) => <TextField {...params} label="Category" />}
                            // isOptionEqualToValue={(option, value) => option.value === value.value}
                        />
                        <TextField label="Code" fullWidth className="mt-4" {...register("code", { value: BusinessPartnersData?.code })}></TextField>
                        <TextField label="Name" fullWidth className="mt-4" {...register("name")} />

                        {/* <TextField label="Address" fullWidth className="mt-4" multiline  {...register("address", { value: BusinessPartnersData?.name })}
                            maxRows={4}></TextField>

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={true}  {...register("address", { value: BusinessPartnersData?.is_active })} />
                                }
                                label="Active"
                            />
                        </FormGroup> */}
                        {/* <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={tabValue}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    <Tab label="Main Info" value="1" /> 
                                </TabList>
                            </Box>
                            <TabPanel value="1">
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField className="mt-4" fullWidth label="Name (BIR)" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Telephone No." variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Mobile No." variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Tin" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Website" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Email" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Zip Code" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Business Style" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField fullWidth label="Beginning balance date" InputLabelProps={{ shrink: true }} variant="outlined" type="date" color="primary" />

                                        <TextField className="mt-4" fullWidth label="Fax No" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Branch Code" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="RDO Code" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />
                                        <TextField className="mt-4" fullWidth label="Industry" variant="outlined" color="primary" InputLabelProps={{ shrink: true }} />

                                    </Grid>

                                </Grid>
                            </TabPanel>

                        </TabContext>
                    </Box> */}
                        <DialogActions className="d-flex justify-center">
                            <Button variant="contained" type="submit" style={{ backgroundColor: 'green' }}>
                                Save
                            </Button>
                            <Button variant="contained" style={{ backgroundColor: 'red' }} >
                                Cancel
                            </Button>
                        </DialogActions>
                    </form>
                </Box>
            </Dialog>
        </>
    )
}
export default BusinessPartnersModal