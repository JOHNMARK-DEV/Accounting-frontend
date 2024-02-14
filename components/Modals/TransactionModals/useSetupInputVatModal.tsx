import React, { forwardRef, useEffect, useRef, useState } from "react";
import Table from "@/components/Tables/EditableTable";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Button, Dialog, DialogProps, DialogTitle, Stack } from "@mui/material";
import { WidthNormal } from "@mui/icons-material";

const SetupInputVatModal = () => {

    const TableComponentRef = useRef(null);
    const [rows, setRows] = useState<GridRowsProp>([])
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xl');

    const columns: GridColDef[] = [
        { field: 'tin', headerName: 'Tin', width: 130, editable: true, },
        { field: 'code', headerName: 'Client Code', width: 150, editable: true, },
        { field: 'name', headerName: 'Client Name', width: 150, editable: true, },
        { field: 'address', headerName: 'Client Address', width: 300, editable: true, },
        { field: 'rate', headerName: 'Vat Rate', width: 100, editable: true, },
        { field: 'isInclusive', headerName: 'Vat Inclusive', width: 100, editable: true, },
        { field: 'purchase_amount', headerName: 'Purchase Amount', width: 160, editable: true, },
        { field: 'vat_amount', headerName: 'Vat Amount', width: 160, editable: true, },
        { field: 'net_purchase_amount', headerName: 'Net Purchase', width: 160, editable: true, },
    ]
    const onSave = () => {

    }
    return (
        <Dialog open={true} fullWidth
            maxWidth={maxWidth}
        >
            <DialogTitle>Input Vat Details</DialogTitle>

            <Table parentRef={TableComponentRef} _cols={columns} _rows={rows} onSave={onSave} onDelete={onSave} onCancel={onSave} />
            <Stack spacing={2} direction="row" alignSelf={'center'}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'Green' }}
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
export default SetupInputVatModal