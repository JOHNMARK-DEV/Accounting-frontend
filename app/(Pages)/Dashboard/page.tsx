"use client"
import { Label } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, FormLabel, Grid } from '@mui/material';
import * as React from 'react';

export default function Dashboard() {
    return (
        <div className='mx-56'>
            <Card className='mb-10'>
                <Grid container className='p-8'>
                    <Grid item md={12}>
                        <h1 className='text-xl'>Select Book</h1>
                    </Grid>
                    <Grid container>
                        <Grid className='m-2'>
                            <Button className='w-100 p-2 bg-teal-700 text-white text-md font-bold hover:text-blue-600'>Book 1</Button>
                        </Grid>
                        <Grid className='m-2'>
                            <Button className='w-100 p-2 bg-teal-700 text-white text-md font-bold hover:text-blue-600'>Book 2</Button>
                        </Grid>
                        <Grid className='m-2'>
                            <Button className='w-100 p-2 bg-teal-700 text-white text-md font-bold hover:text-blue-600'>Book 3</Button>
                        </Grid>  
                    </Grid>
                </Grid>
            </Card>
            {/* <FormLabel className="mx-auto text-xl font-bold ">Sales</FormLabel> */}
            <Grid container md={12} spacing={2}>
                <Grid item md={6}>
                    <Card>
                        <CardHeader
                            title="Daily Sales"
                        />
                        <CardContent>
                            sdfsdf
                        </CardContent>
                        <CardActions>
                            <Button size="small">See more</Button>
                        </CardActions> 
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Card>
                        <CardHeader
                            title="Monthly Sales"
                        />
                        <CardContent>
                            sdfsdf
                        </CardContent>
                        <CardActions>
                            <Button size="small">See more</Button>
                        </CardActions> 
                        
                    </Card>
                </Grid>
                <Grid item md={12} className='mb-10'>
                    <Card>
                        <CardHeader
                            title="Account Receivables - pending"
                        />
                        <CardContent>
                            sdfsdf
                        </CardContent>
                        <CardActions>
                            <Button size="small">See more</Button>
                        </CardActions> 
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Card>
                        <CardHeader
                            title="Daily Expense"
                        />
                        <CardContent>
                            sdfsdf
                        </CardContent>
                        <CardActions>
                            <Button size="small">See more</Button>
                        </CardActions> 
                    </Card>
                </Grid>
                <Grid item md={6}>
                    <Card>
                        <CardHeader
                            title="Monthly Expense"
                        />
                        <CardContent>
                            sdfsdf
                        </CardContent>
                        <CardActions>
                            <Button size="small">See more</Button>
                        </CardActions> 
                    </Card>
                </Grid>
                <Grid item md={12}>
                    <Card>
                        <CardHeader
                            title="Account Payable - pending"
                        />
                        <CardContent>
                            sdfsdf
                        </CardContent>
                        <CardActions>
                            <Button size="small">See more</Button>
                        </CardActions> 
                    </Card>
                </Grid>

            </Grid>
        </div>
    )
}