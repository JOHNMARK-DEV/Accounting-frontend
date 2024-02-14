import React, { forwardRef, useEffect, useRef, useState } from "react";
import Table from "@/components/Tables/EditableTable";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { Button, Dialog, DialogProps, DialogTitle, Stack } from "@mui/material";

const OffsetInputVatModal = () => {

    const TableComponentRef = useRef(null);
    const [rows, setRows] = useState<GridRowsProp>([])
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('xl');

    const columns: GridColDef[] = [
        { field: 'No', headerName: 'Reference No.', width: 130, editable: true, },
        { field: 'Date', headerName: 'Reference Date', width: 150, editable: true, },
        { field: 'Code', headerName: 'Journal Code', width: 150, editable: true, },
        { field: 'Reference', headerName: 'General Reference', width: 300, editable: true, },
        { field: 'Amount', headerName: 'Amount', width: 100, editable: true, },
        { field: 'isInclusive', headerName: '', width: 100, editable: true, },
        { field: 'Remitted', headerName: 'Amount Remitted', width: 160, editable: true, },
        { field: 'Balance', headerName: 'Balance', width: 160, editable: true, },
    ]
    const onSave = () => {

    }
    return (
        <Dialog open={true} fullWidth
            maxWidth={maxWidth}
        >
            <div className="flex justify-between">
                <DialogTitle>Input Vat Offsetting</DialogTitle>
                <Button>Close</Button>
            </div>

            <Table hideAddBtn={true} parentRef={TableComponentRef} _cols={columns} _rows={rows} onSave={onSave} onDelete={onSave} onCancel={onSave} />
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
export default OffsetInputVatModal