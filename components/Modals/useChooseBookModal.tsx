import React, { forwardRef, useEffect, useRef, useState } from "react";
import Table from "@/components/Tables/SelectableTable";
import { DataGrid, GridColDef, GridRowId, GridRowsProp } from "@mui/x-data-grid";
import { Button, Dialog, DialogProps, DialogTitle, Stack } from "@mui/material";

import useStore from "@/store/store";

const useChooseBookModal = (closeModal: () => void) => {

    const TableComponentRef = useRef(null);
    const [rows, setRows] = useState<GridRowsProp>([])
    const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');

    const {
        getBooks,
        BooksList,
        setSelectedBook
    }: any = useStore()
    const columns: GridColDef[] = [

        { field: 'code', headerName: 'Book', width: 130, editable: true, },
        { field: 'name', headerName: 'Book Description', width: 250, editable: true, },
        {
            field: '',
            type: 'actions',
            headerName: '',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <Button
                        className="bg-blue-100"
                        onClick={handleSelectClick(id)}
                    >Choose</Button>
                ];
            },
        },

    ]

    const handleSelectClick = (id: GridRowId) => () => {
        const selectedBook = BooksList.filter((data: any) => data.id == id)[0] 
        setSelectedBook(selectedBook)
        closeModal()
    }

    useEffect(() => {
        getBooks()
    },[])
    const onSave = () => {

    }
    return (
        <Dialog open={true} fullWidth
            maxWidth={maxWidth}
        >
            <div className="flex justify-between">
                <DialogTitle>Choose Book</DialogTitle>
                <Button>Close</Button>
            </div>
            <div style={{ height: '50vh', width: '100%', overflow: 'auto' }}>
                <DataGrid
                    editMode="row"
                    density="compact"
                    rows={BooksList}
                    columns={columns}
                    pageSizeOptions={[20]}
                // slots={{ toolbar: QuickSearchToolbar }}
                />
            </div>
            {/* <Table parentRef={TableComponentRef} _cols={columns} _rows={BooksList} onSave={onSave} onDelete={onSave} onCancel={onSave} /> */}
            <Stack spacing={2} direction="row" alignSelf={'center'}>
                <Button
                    variant="contained"
                    style={{ backgroundColor: 'red', margin: '10px' }}
                    onClick={closeModal}
                >
                    Close
                </Button>
            </Stack>
        </Dialog>
    )

}
export default useChooseBookModal