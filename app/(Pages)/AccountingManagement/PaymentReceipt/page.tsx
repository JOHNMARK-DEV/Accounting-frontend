"use client"
import React, { useEffect, useMemo, useRef, useState } from "react";
import CustomButtons from "@/components/Buttons/CustomButtons";
import { Box, Card, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField, TextareaAutosize } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from "@/components/Tables/EditableTable_Transaction";
import { GridRowsProp } from "@mui/x-data-grid";
import dayjs from 'dayjs';
import { DateValidationError } from "@mui/x-date-pickers";
import HelpIcon from '@mui/icons-material/Help';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { boolean, z } from 'zod';
const today = dayjs();
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

// MODALS 
import SetupInputVatModal from "@/components/Modals/TransactionModals/useSetupInputVatModal";
import OffsetInputVatModal from "@/components/Modals/TransactionModals/useOffsetInputVatModal";
import { Label } from "@mui/icons-material";
import FetchSetupModal from "@/components/Modals/TransactionModals/FetchSetupModal";
import useStore from "@/store/store";
import SettingsModal from "@/components/Modals/TransactionModals/SettingsModal";
import UDF from "@/components/Card/UDF";

const startOfQ12022 = dayjs('2024-01-01T00:00:00.000');
const endOfQ12022 = dayjs('2024-01-31T23:59:59.999');

interface ISettings {
    book_id: String,
    book_code: String,
    month: String,
    year: String,
}
const schema = z.object({
    transaction_no: z.string(),
    delivery_receipt: z.string(),
    // customer_id: z.string(),
    customer_code: z.string(),
    customer_name: z.string(),

    based_rate: z.string(),
    based_amount: z.string(),

    exchange_rate: z.string(),
    exchange_amount: z.string(),

})
// interface IModalState {
//     isOpen: boolean | any
// }
interface TransactionData extends z.infer<typeof schema> { }
const initialRows: GridRowsProp = [
    {
        id: '1',
        code: '',
        name: '',
        debit: 0,
        credit: 0,
        debit_based: 0,
        credit_based: 0,
        project_unit: '',
        general_reference_code: '',
        general_reference: '',
        line_remarks: '',
        attachment: []

    },
];



const Invoicing = () => {
    const [modalName, setModalName] = useState("")

    const [isEditable, setisEditable] = useState(false);
    const [forceUpdateFlag, setForceUpdateFlag] = useState(0);
    const [ModalSettings, openModalSettings] = useState(true)
    const [settingsValue, setsettingsValue] = useState<ISettings>()
    const [toggleBPModal, setToggleBPModal] = useState(false)
    const [toggleCOAmodal, setToggleCOAmodal] = useState(false)
    const tableRef: any = useRef(null);
    const [transaction, setTransaction] = useState<TransactionData>()
    const [rows, setRows] = useState<GridRowsProp>(initialRows)
    const {
        getBusinessPartner,
        getCurrency,
        CurrencyList,
        getChartofAccountList,
        BusinessPartnerList,
    }: any = useStore()

    useEffect(() => {
        getBusinessPartner(),
            getChartofAccountList(),
            getCurrency()
    }, [])

    const handleSetDefault = () => {
        setValue("based_rate", "1")
        setValue("based_amount", 1)

        setValue("exchange_rate", 1)
        setValue("exchange_amount", 1)
    }

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: any) => {
        console.log('saving..', data)
    }
    const onClickAdd = () => () => {
        setisEditable(!isEditable)
    }

    const onClickAddEntry = () => {
        tableRef.current.onAddEntry();
    }

    const onClickRemoveEntry = () => {
        tableRef.current.onRemoveEntry()
    }
    const onCloseModal = (id: any) => {
        switch (modalName) {
            case "Business Partner":

                if (id > 0) {
                    let Customer = BusinessPartnerList.filter((data: any) => data.id == id)[0]
                    setValue("customer_id", Customer.id)
                    setValue("customer_code", Customer.code)
                    setValue("customer_name", Customer.name + Customer.name)
                    return
                }
                setValue("customer_id", "")
                setValue("customer_code", "")
                setValue("customer_name", "")
                break;
            default:
                break;
        }
        setModalName(() => "")
    }


    const [error, setError] = React.useState<DateValidationError | null>(null);
    const handleOnchangeInput = (Modal: string) => () => {
        // setForceUpdateFlag(() => forceUpdateFlag + 1)
        setModalName(() => Modal)
        setToggleBPModal(() => !toggleBPModal)
    }
    return (
        <div key={forceUpdateFlag}>
            <SettingsModal onClose={() => onCloseModal(0)} formState={settingsValue} setSelectionState={setsettingsValue} openModal={ModalSettings} />
            <FetchSetupModal onClose={onCloseModal} ModalName={modalName} modalState={toggleBPModal} setModalState={setToggleBPModal} />
            {/* <SetupInputVatModal/> */}
            {/* <OffsetInputVatModal/>  */}
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Accounting Management
                </Link>
                <Typography color="text.primary">Payment Receipt</Typography>
            </Breadcrumbs>
            <Grid container spacing={2} >
                <Grid item xs={10}>
                    <Card className="p-2">
                        <CustomButtons onClickAdd={onClickAdd()} isShowSaveBtn={true} ButtonNames={['Add', 'Edit', 'Delete', 'Print']} />
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2} className="m-2"  >
                                <Grid container spacing={2} xs={12}>
                                    <Grid item xs={2}>
                                        <FormLabel className="mt-4" >Invoicing No.</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="label"
                                            variant="filled"
                                            color="primary"
                                            disabled={!isEditable}
                                            {...register('transaction_no', { value: transaction?.transaction_no })}
                                        />
                                        <FormLabel className="mt-4" >D.R No.</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="label"
                                            variant="outlined"
                                            color="primary"
                                            disabled={!isEditable}
                                            {...register('delivery_receipt', { value: transaction?.delivery_receipt })}
                                        />
                                        <FormLabel className="mt-4">Client Code</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="label"
                                            variant="outlined"
                                            color="primary"
                                            disabled={!isEditable}
                                            {...register('customer_code', { value: transaction?.customer_code })}
                                            onChange={handleOnchangeInput("Business Partner")}
                                        />
                                        <FormLabel className="mt-4">Client Name</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                            {...register('customer_name', { value: transaction?.customer_name })}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            multiline
                                        />
                                    </Grid>
                                    <Grid item xs={2} className="flex flex-col content-start">
                                        <FormLabel  >Date</FormLabel>
                                        <DatePicker
                                            defaultValue={dayjs()}
                                            onError={(newError) => setError(newError)}
                                            minDate={startOfQ12022}
                                            maxDate={endOfQ12022}
                                            disabled={!isEditable}
                                        />
                                        <FormLabel>Due Date</FormLabel>
                                        <DatePicker
                                            defaultValue={dayjs()}
                                            onError={(newError) => setError(newError)}
                                            minDate={startOfQ12022}
                                            disabled={!isEditable}

                                        />
                                        <FormLabel>P.O No.</FormLabel>
                                        <TextField
                                            size="small" fullWidth variant="outlined" color="primary" />
                                        <FormLabel>Currency</FormLabel>
                                        <Box>
                                            <FormControl fullWidth>
                                                <Select
                                                    MenuProps={{
                                                        anchorOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "left",
                                                        },
                                                        transformOrigin: {
                                                            vertical: "bottom",
                                                            horizontal: "center",
                                                        },
                                                    }}
                                                    disabled={!isEditable}
                                                >

                                                    {
                                                        CurrencyList.map((data: any) => {
                                                            <MenuItem value={data.id}>{data.code}</MenuItem>
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <FormLabel className="mt-4">Total Amount</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            variant="filled"
                                            color="primary"
                                            disabled={!isEditable}
                                            {...register('based_amount', { value: transaction?.based_amount })}
                                        />
                                        <FormLabel className="mt-4">Exchange Rate</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            variant="filled"
                                            color="primary"
                                            disabled={!isEditable}
                                            {...register('based_rate', { value: transaction?.based_rate })}
                                        />
                                        <FormLabel className="mt-4">Based Rate</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            variant="filled"
                                            color="primary"
                                            disabled={!isEditable}
                                            {...register('based_rate', { value: transaction?.based_rate })}
                                        />
                                        <FormLabel className="mt-4">Based Amount</FormLabel>
                                        <TextField
                                            size="small"
                                            fullWidth
                                            type="label"
                                            variant="filled"
                                            color="primary"
                                            disabled={!isEditable}
                                            {...register('based_amount', { value: transaction?.based_amount })}
                                            InputProps={{
                                                readOnly: true,
                                            }}
                                            onChange={() => window.location.reload()}
                                        />

                                    </Grid>
                                    <Grid item xs={3}>
                                        {/* <FormLabel className="mt-3">Amount in Words</FormLabel>
                            <Textarea
                                minRows={3}
                                readOnly
                            /> */}
                                        <FormLabel className="mt-3">Particulars</FormLabel>
                                        <Textarea minRows={3} />
                                    </Grid>
                                </Grid>
                            </Grid>

                        </form>
                        <div className="mt-4 overflow-auto">
                            <CustomButtons onAddEntry={() => onClickAddEntry()} onRemoveEntry={onClickRemoveEntry} isShowSaveBtn={false} ButtonNames={['Add Entry', 'Remove Entry']} />
                            <Table
                                ref={tableRef}
                                _rows={rows}
                                onSave={handleOnchangeInput("Chart of Account")}
                            // onSave={handleOnchangeInput("Chart of Account")}
                            // onDelete={handleOnchangeInput("Business Partner")}
                            // onCancel={handleOnchangeInput("Business Partner")}
                            />
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={2}>
                    <UDF />
                </Grid>

            </Grid>
        </div>
    )
}

export default Invoicing;