import React, { forwardRef, memo, useImperativeHandle } from 'react';
import Box from '@mui/material/Box';
import useStore from "@/store/store";
import { randomId } from '@mui/x-data-grid-generator';
import FetchSetupModal from '../Modals/TransactionModals/FetchSetupModal';

import SetupEwtModal from '../Modals/TransactionModals/useSetupEwtModal';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridToolbarQuickFilter,
    GridRowSelectionModel,
    GridCellParams,
    GridEditCellValueParams,
} from '@mui/x-data-grid';
import { TextField } from '@mui/material';

interface ChildProps {
    onAddEntry?: () => void;
    onRemoveEntry?: () => void;
    // handleModalResult: (props: any) => void;
    // other child props
}

interface ITable {
    _rows: GridRowsProp,
    onSave: () => void;
    onDelete?: (id: GridRowId) => void;
    onCancel?: (id: GridRowId) => void;
    onSearchItem?: (id: GridRowId | undefined) => void;
    onSearchProject?: (id: GridRowId) => void;
    onSearchDepartment?: (id: GridRowId) => void;
    hideAddBtn?: boolean;
} 

const Table: React.ForwardRefRenderFunction<ChildProps, ITable> = (
    { onSave, onDelete, onCancel, onSearchItem, _rows, hideAddBtn = false },
    ref
) => {
    const initialRows: GridRowsProp = [
        ..._rows, 

    ];
    const [cellCodeState, setCellCodeState] = React.useState(true)



    const [modalName, setModalName] = React.useState("")
    const [chartValidationId, setChartValidationId] = React.useState(0)
    const [entrySide, setEntrySide] = React.useState("")
    const [ToggleModal, setToggleModal] = React.useState(false)
    const [selectedRows, setSelectedRows] = React.useState<GridRowSelectionModel>([]);
    const [lastEditedRowId, setlastEditedRowId] = React.useState('');
    const [lastUpdatedColumn, setLastUpdatedColumn] = React.useState(null);
    const [rows, setRows] = React.useState(initialRows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    useImperativeHandle(ref, () => ({
        onAddEntry() {
            const id = randomId();
            setRows((oldRows) => [...oldRows, { id, isNew: true }]);
            setRowModesModel((oldModel) => ({
                ...oldModel,
                [id]: { mode: GridRowModes.Edit, fieldToFocus: 'code' },
            }));
        },
        onRemoveEntry() {
            setRows(rows.filter((row) => !selectedRows.includes(row.id)));
        }

    }));

    const {
        ChartofAccountList
    }: any = useStore()

    React.useEffect(() => {
        const updatedRowModesModel: any = {};
        // Object.keys(rowModesModel).forEach(id => {
        //     updatedRowModesModel[id] = { mode: GridRowModes.View };
        // });

        // Set the updated state
        setRowModesModel(updatedRowModesModel);
    }, [])
    const renderEditCell = (params: any) => {
        if (params.field === 'code') {
            return (
                <TextField
                    autoFocus
                    value={params.value}
                    onChange={(e) => handleOnchangeInput("", "Chart of Account")}
                />
            );
        }
        if (params.field === 'debit') {
            return (
                <TextField
                    type='number'
                    autoFocus
                    value={params.value}
                    onChange={(e) => {
                        handleOnchangeInput("debit", params.row.validation_id)
                    }
                    }
                />
            );
        }
        if (params.field === 'credit') {
            return (
                <TextField
                    autoFocus
                    value={params.value}
                    onChange={(e) => {
                        handleOnchangeInput("credit", params.row.validation_id)
                    }
                    }
                />
            );
        }
    };
    const columns: GridColDef[] = [
        {
            field: 'code',
            headerName: 'Acct. Code',
            width: 70,
            editable: true,
            renderEditCell: renderEditCell,

        },
        { field: 'name', headerName: 'Acct. Title', width: 280, editable: false },
        {
            field: 'debit', headerName: 'Debit', width: 130,
            type: 'number',
            align: 'right',
            editable: true,
            valueFormatter: ({ value }) => (value ? ` ${value.toLocaleString()}` : ''),
            renderEditCell: renderEditCell,
        },
        {
            field: 'credit', headerName: 'Credit', width: 130,
            type: 'number',
            align: 'right',
            editable: true,
            valueFormatter: ({ value }) => (value ? ` ${value.toLocaleString()}` : ''),
            renderEditCell: renderEditCell,
        },
        {
            field: 'debit_based', headerName: 'Debit based', width: 130,
            type: 'number',
            align: 'right',
            editable: false,
            valueFormatter: ({ value }) => (value ? ` ${value.toLocaleString()}` : ''),
        },
        {
            field: 'credit_based', headerName: 'Credit based', width: 130,
            type: 'number',
            align: 'right',
            editable: false,
            valueFormatter: ({ value }) => (value ? ` ${value.toLocaleString()}` : ''),
        },
        { field: 'general_ref', headerName: 'General Reference', width: 130, editable: true },
        { field: 'delivery_ref', headerName: 'Delivery No. Reference', width: 130, editable: true },
        { field: 'project', headerName: 'Project', width: 100, editable: true },
        { field: 'department', headerName: 'Department', width: 100, editable: true },
        { field: 'line_remarks', headerName: 'Line Remarks', width: 130, editable: true },
    ]

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
        // alert('handleRowEditStop')
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        setlastEditedRowId(newRow.id);
        // onSave();
        return updatedRow;
    };
    const onCloseModal = (id: any) => {
        switch (modalName) {
            case "Chart of Account":
                let data = ChartofAccountList.filter((data: any) => data.id == id)[0]
                setRows(rows.map((row) => (row.id === lastEditedRowId ? { ...row, validation_id: data.validation_id, name: data.name, code: data.code } : row)));
                setModalName(() => "")
                // setCellCodeState(() => !cellCodeState)
                break;

            default:
                break;
        }
    }
    const onSaveTransactionModalDebit = (data: any, total: any) => {
        setRows(rows.map((row) =>
        (row.id == lastEditedRowId ?
            { ...row, debit: total, credit: 0, attachment: data }
            : row)));

        setToggleModal(false)
        setModalName(() => "")
        console.log("total details row ", rows)
    }

    const onSaveTransactionModalCredit = (data: any) => {
        console.log('data', data.total)
        setRows(rows.map((row) => (row.id == lastEditedRowId ? { ...row, credit: data.total, debit: 0 } : row)));
        setToggleModal(false)
        setModalName(() => "")
    }
    // SHOWING SETUP OR OFFSET MODALS
    const handleOnchangeInput = (EntrySide: string, Modal: string | any) => {
        if (EntrySide == "") {
            switch (Modal) {
                case "Chart of Account":
                    // alert('eto yun')
                    // alert(ToggleModal)
                    setChartValidationId(() => 0)
                    setToggleModal(() => true)
                    break;
                default:
                    break;
            }
            setModalName(() => Modal)
            setEntrySide(() => "")
            return
        }
        if (EntrySide == "debit") {
            setEntrySide(() => EntrySide)
            switch (Modal) {
                case "1":
                    setToggleModal(() => !ToggleModal)
                    break;

                case "2":
                    setToggleModal(() => !ToggleModal)
                    break;

                case "3":
                    setToggleModal(() => !ToggleModal)
                    break;

                case 4:
                    setChartValidationId(() => Modal)
                    setToggleModal(() => !ToggleModal)

                    break;

                default:
                    setEntrySide(() => entrySide)
                    break;
            }
            return
        }
        if (EntrySide == "creidt") {
            return
        }

    }

    const VISIBLE_FIELDS = ['code', 'name', 'debit', 'credit', 'debit_based', 'credit_based', 'general_ref', 'delivery_ref', 'project', 'department', 'line_remarks'];

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
                }}
            >
                <GridToolbarQuickFilter />
            </Box>
        );
    }
    const attachment: GridRowsProp = [
        rows.map(data => data.attachment)
    ];
    return (
        <Box
            sx={{
                height: '70vh',
                marginLeft: "auto",
                marginRight: "auto",
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
            }}
        >
            <FetchSetupModal
                onClose={onCloseModal}
                ModalName={modalName}
                modalState={chartValidationId == 0 ? ToggleModal : false}
                setModalState={setToggleModal}
            />
            <SetupEwtModal
                modalState={chartValidationId == 4 && entrySide == "debit" ? ToggleModal : false}
                setModalState={setToggleModal}
                onSave={onSaveTransactionModalDebit}
                _rows={rows.map(data =>lastEditedRowId == data.id && chartValidationId == 4 && entrySide == "debit" ? data.attachment : [])}
            />

            <DataGrid
                rows={rows}
                columns={_columns}
                density="compact"
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                // handleEditCellChange={handleEditCellChange}  // Use this prop for cell edit changes
                // onEditCellChange={handleEditCellChange}  // Use this prop for cell edit changes
                slots={{ toolbar: QuickSearchToolbar }}
                checkboxSelection
                disableRowSelectionOnClick
                slotProps={{
                    toolbar: {
                        setRows,
                        setRowModesModel
                    },
                }}
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setSelectedRows(newRowSelectionModel);
                }}
                rowSelectionModel={selectedRows}
            />
        </Box>
    );
};


export default forwardRef(Table);

