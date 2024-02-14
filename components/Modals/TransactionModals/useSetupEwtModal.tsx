import React, { forwardRef, useEffect, useRef, useState } from "react";
import Table from "@/components/Tables/EditableTable_Transaction_ForModal";
import { GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";
import { Button, Dialog, DialogProps, DialogTitle, Stack } from "@mui/material";
import { WidthNormal } from "@mui/icons-material";
import { ChildProps } from "postcss";

interface IModalState {
    isOpen: boolean
}
interface IProps {
    
    modalState: IModalState | any,
    setModalState: React.Dispatch<React.SetStateAction<IModalState | any>>,
    _rows?: GridRowsProp | any,
    onSave: (data: any, total: number) => void
}

const initialRows: GridRowsProp = [
    {
        id: '1',
        tin: '',
        code: '',
        name: '',
        rate: .12,
        amount: 0,
        tax_withheld: 0,
    },
];
 
const useSetupEwtModal = ({ modalState, setModalState, _rows, onSave }: IProps) => {

    const TableComponentRef = useRef(null);
    const [rows, setRows] = useState<GridRowsProp>(_rows && initialRows)
    // const [modalState, setModalState] = useState(true)
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('lg');

    const columns: GridColDef[] = [
        // { field: 'id', headerName: 'id', width: 0, editable: true, hidden },
        { field: 'tin', headerName: 'Tin', width: 130, editable: true, },
        { field: 'code', headerName: 'Supplier Code', width: 150, editable: true, },
        { field: 'name', headerName: 'Supplier Name', width: 200, editable: true, },
        { field: 'rate', headerName: 'Tax Rate', width: 100, editable: true, type: 'number' },
        { field: 'amount', headerName: 'Amount of Payment', width: 200, editable: true, type: 'number' },
        { field: 'tax_withheld', headerName: 'Tax Withheld', width: 160, editable: true, type: 'number' },
    ]
    const handleSaveClick = (data: any) => { 
        setModalState(false)
    }
    const [forceUpdateFlag, setForceUpdateFlag] = useState(0)
    const onSaveTable = (data: any) => {
        setRows(() => data) 
        console.log("current rows", rows)
        console.log("bakit wala pap ", data)
    }
    // const onDeleteTable = (id:GridRowId) => {   
    //     setRows(() => rows.filter((data) => data.id != id))  
    // }
    const handleOnSave = () => {
        let total: number = 0
        rows.forEach((data, index) => {
            console.log("loop", index, data.amount)
            if (data.amount == undefined) {
                total += 0
            } else {
                total += data.amount
            }
        })
        console.log("handleOnSavesss", rows)
        onSave(rows, total)
    }
    useEffect(() => {
        setForceUpdateFlag(() => forceUpdateFlag + 1) 
    }, [rows])
    return (
        <Dialog open={modalState} fullWidth
            maxWidth={maxWidth}
        >
            <DialogTitle>EWT Details</DialogTitle>
            <Table parentRef={TableComponentRef} _cols={columns} _rows={rows} onSave={onSaveTable} onCancel={handleSaveClick} />
            <Stack spacing={2} direction="row" alignSelf={'center'}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'Green' }}
                    onClick={handleOnSave}
                >
                    Save
                </Button>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'red' }}
                >
                    Cancel
                </Button>
            </Stack>
        </Dialog>
    )

}
export default useSetupEwtModal
