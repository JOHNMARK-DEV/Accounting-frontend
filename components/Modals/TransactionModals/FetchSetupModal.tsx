import React, { forwardRef, useEffect, useRef, useState } from "react";
import Table from "@/components/Tables/SelectableTable";
import { DataGrid, GridActionsCellItem, GridColDef, GridRowId, GridRowsProp, GridToolbarQuickFilter } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogProps, DialogTitle, Stack } from "@mui/material";
import { WidthNormal } from "@mui/icons-material";
import { useDemoData } from "@mui/x-data-grid-generator";
import AddIcon from '@mui/icons-material/Add';
import { BusinesspartnerSetupService } from "@/services/DatabaseServices";
import useStore from "@/store/store";
import CloseIcon from '@mui/icons-material/Close';
import { boolean } from "zod";

interface IModalState {
    isOpen: boolean
}

interface IProps {
    modalState: IModalState | any,
    setModalState: React.Dispatch<React.SetStateAction<IModalState | any>>,
    ModalName: String,

    onClose: (id: GridRowId | any) => void
}

const FetchSetupModal = ({ modalState, setModalState, ModalName, onClose }: IProps) => {
    const {
        BusinessPartnerList, 
        ChartofAccountList,
    }: any = useStore()

    const [rows, setRows] = useState<GridRowsProp>([])
    const [reloadModal, setReload] = React.useState(false);
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    useEffect(() => {
        onloadData()
    }, [ModalName])

    const onloadData = () => {  
        switch (ModalName) {
            case "Business Partner":
                setRows(() => BusinessPartnerList)
                break;
            case "Chart of Account": 
                setRows(() => ChartofAccountList)
                break;
            case "Department":
                break;

            default:
                setRows(()=>[])
                break;
        } 
    }
    const handleSelectClick = (id: GridRowId) => () => { 
        onClose(id)
        setModalState(false)
    };
    const handleCancel = () => {
        ModalName = ""
        setModalState(false)
    }
    const columns: GridColDef[] = [
        {
            field: '',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <Button
                        onClick={handleSelectClick(id)}
                    > <AddIcon />  </Button>
                ];
            },
        },
        { field: 'code', headerName: 'Code', width: 150, editable: false, },
        { field: 'name', headerName: 'Name', width: 200, editable: false, },
    ]
    
    const VISIBLE_FIELDS = ['code', 'name', ''];
    const { data } = useDemoData({
        dataSet: 'Employee',
        visibleFields: VISIBLE_FIELDS,
        rowLength: 100,
    });

    // Otherwise filter will be applied on fields such as the hidden column id
    const _columns = React.useMemo(
        () => columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [columns],
    );
    function QuickSearchToolbar() {
        return (
            <Box
                sx={{
                    p: 0.5,
                    pb: 0,
                    mt: 2,
                }}
            >
                <GridToolbarQuickFilter />
            </Box>
        );
    }

    return (
        <Dialog open={modalState} fullWidth
            maxWidth={maxWidth}
        > 
            <DialogTitle className="flex justify-between">{ModalName}
                <Button className="text-rose-900" onClick={() => handleCancel()}>
                    <CloseIcon htmlColor="red" />Close
                </Button>
            </DialogTitle>
            <div style={{ height: '50vh', width: '100%', overflow: 'auto' }}>
                <DataGrid
                    editMode="row"
                    density="compact"
                    rows={rows}
                    columns={_columns}
                    pageSizeOptions={[20]}
                    slots={{ toolbar: QuickSearchToolbar }}
                />
            </div>
        </Dialog>
    )

}
export default FetchSetupModal