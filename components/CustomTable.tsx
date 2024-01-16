
import React from "react"
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, Stack, TextField } from "@mui/material"
import { DataGrid, GridToolbar } from "@mui/x-data-grid"
import { GridInitialStateCommunity } from "@mui/x-data-grid/models/gridStateCommunity"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
dayjs.extend(utc);
const Table = (
    {
        data, columns, initialState, setSelectionState,
        customTools: { searchBar = false, dateRange = false, date = false } = {}
    }:
        {
            data: any[], columns: any[], initialState?: GridInitialStateCommunity, setSelectionState?: React.Dispatch<React.SetStateAction<any>>,
            customTools: { searchBar?: boolean, dateRange?: boolean, date?: boolean }
        }) => {

    const [filteredData, setFilteredData] = React.useState<any[]>([])
    const [searchBartext, setSearchBarText] = React.useState('')
    const [dateFrom, setDateFrom] = React.useState(dayjs().add(-1, 'day').format('MM/DD/YYYY'))
    const [dateTo, setDateTo] = React.useState(dayjs().format('MM/DD/YYYY'))
    const [byDate, setByDate] = React.useState(dayjs().format('MM/DD/YYYY'))
    React.useEffect(() => {
        console.log("table", data)
        if (searchBartext !== '') {
            const filteredArray = data.filter((item) =>
                Object.entries(item).some(([fieldName, value]) => {
                    const isDate = dayjs(value as string).isValid()
                    return !isDate ? (value as string).toLowerCase().includes(searchBartext) : dayjs(value as string).format('MM/DD/YYYY').includes(searchBartext)
                })
            );
            setFilteredData(filteredArray.length > 0 ? filteredArray : [])
        } else {
            setFilteredData(data)
        }
    }, [searchBartext])
    React.useEffect(() => {
        setFilteredData(data)
    }, [data])

    return (
        <Stack spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                {/* {
                    searchBar &&
                    <TextField
                        value={searchBartext}
                        onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setSearchBarText(event.target.value)}
                        size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                        }}
                    />
                } */}
                {/* {
                    dateRange &&
                    <Stack direction={'row'} spacing={2}>
                        <DatePicker
                            value={dayjs(dateFrom)}
                            onChange={val => {
                                setDateFrom(val === null ? '' : dayjs(val).format('MM/DD/YYYY'))
                            }}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                        <DatePicker
                            value={dayjs(dateTo)}
                            onChange={val => {
                                setDateTo(val === null ? '' : dayjs(val).format('MM/DD/YYYY'))
                            }}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </Stack>
                }
                {
                    date &&
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            value={dayjs(byDate)}
                            onChange={val => {
                                setByDate(val === null ? '' : dayjs(val).format('MM/DD/YYYY'))
                            }}
                            slotProps={{ textField: { size: 'small' } }}
                        />
                    </LocalizationProvider>

                } */}
            </Stack>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DataGrid
                    sx={{ '--DataGrid-overlayHeight': '300px', minHeight: '60vh' }}
                    disableColumnMenu={true}
                    rows={filteredData}
                    columns={columns}
                    getRowHeight={() => 'auto'}
                    slots={{
                        toolbar: GridToolbar,
                        //  noRowsOverlay: CustomNoRowsOverlay
                    }}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20]}
                    checkboxSelection={false}
                    onRowSelectionModelChange={(row) => {
                        setSelectionState && setSelectionState(row)
                    }}
                />
            </LocalizationProvider>
        </Stack>

    )
}
export default Table;