
import React, { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
    randomCreatedDate,
    randomTraderName,
    randomId,
    randomArrayItem,
} from '@mui/x-data-grid-generator';
import { ChildProps } from 'postcss';

const roles = ['Market', 'Finance', 'Development'];
const randomRole = () => {
    return randomArrayItem(roles);
};


interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
        newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
}



interface ITable {
    _cols: GridColDef[],
    _rows: GridRowsProp,
    onSave: (data: any) => void;
    // onDelete: (id: GridRowId) => void;
    onCancel: (id: GridRowId) => void;
    parentRef: React.RefObject<ChildProps | null>;
    hideAddBtn?: boolean;
}

const Table: React.FC<ITable> = forwardRef(({ onSave, onCancel, _cols, _rows, hideAddBtn = false }, ref) => {
    const initialRows: GridRowsProp = [
        ..._rows
    ];
    const [rows, setRows] = React.useState(initialRows);
    React.useEffect(() => {
        // Iterate over the existing state and update the mode for each item
        const updatedRowModesModel: any = {};
        Object.keys(rowModesModel).forEach(id => {
            updatedRowModesModel[id] = { mode: GridRowModes.View };
        });

        // Set the updated state
        setRowModesModel(updatedRowModesModel);
        console.log('EditableTable_Transaction_ForModal has refresh ')

    }, [])
  


    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
    let columns: GridColDef[] = [
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Actions',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={() => onCancel(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        },
        ..._cols,
    ]

    let hasEditMode
    const handleOnValidateEdit = () => {

        // Check if there's already an edit mode in the existing rows
        hasEditMode = Object.values(rowModesModel).some((row) => row.mode === GridRowModes.Edit);

        // If there's an edit mode, you can handle it accordingly
        if (hasEditMode) {
            console.log("There's already an edit mode in the table. You can't add a new row.");
            return false;
        }
        return true
    }
    function EditToolbar(props: EditToolbarProps) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {
            const id = randomId();
            let newObject: any = {
                id: id,
                isNew: true
            }
            // validate if theres is already edit mode in table
            if (handleOnValidateEdit()) {
                _cols.forEach((value, index) => {
                    if (value.field != "actions") {
                        newObject[value.field]
                    }
                    // newObject = [...newObject,[value.field=""]]
                });


                console.log(newObject)
                setRows((oldRows) => [newObject, ...oldRows]);
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.View, fieldToFocus: 'tin' },
                }));
            }
        };
        return (
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                    Add record
                </Button>
            </GridToolbarContainer>
        );
    }
    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        // validate if theres is already edit mode in table 
        if (handleOnValidateEdit()) {
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
        }
    };


    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        onSave(rows)
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
        // onDelete(id)
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };
    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false }; 
        setRows((prev) => rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        onSave(rows.map((row) => (row.id === newRow.id ? updatedRow : row)))
        return updatedRow;
    };

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
                width: '100%'
            }}
        >
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                    toolbar: !hideAddBtn ? EditToolbar : null
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
                checkboxSelection
            />
        </Box>
    );
})

export default Table;
