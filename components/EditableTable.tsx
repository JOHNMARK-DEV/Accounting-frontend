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
    onDelete: (id: GridRowId) => void;
    onCancel:  (id: GridRowId) => void;
    parentRef: React.RefObject<ChildProps | null>;
}
const Table: React.FC<ITable> = forwardRef(({ onSave, onDelete,onCancel, _cols, _rows }, ref) => {

    React.useEffect(() => {
        // Iterate over the existing state and update the mode for each item
        const updatedRowModesModel: any = {};
        Object.keys(rowModesModel).forEach(id => {
            updatedRowModesModel[id] = { mode: GridRowModes.View };
        });

        // Set the updated state
        setRowModesModel(updatedRowModesModel);
    }, [])
    const initialRows: GridRowsProp = [
        ..._rows
    ];

    const [rows, setRows] = React.useState(initialRows);
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
                        onClick={() => onDelete(id)}
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
        if(hasEditMode) {
            console.log("There's already an edit mode in the table. You can't add a new row.");
            return false;
        }
        return true
    }

    function EditToolbar(props: EditToolbarProps) {
        const { setRows, setRowModesModel } = props;

        const handleClick = () => {

            // validate if theres is already edit mode in table
            if(handleOnValidateEdit()){
                console.log(GridRowModes.Edit)
                const id = randomId();
                setRows((oldRows) => [ { id, isNew: true },...oldRows]);
                setRowModesModel((oldModel) => ({
                    ...oldModel,
                    [id]: { mode: GridRowModes.Edit, fieldToFocus: 'code' },
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
        if(handleOnValidateEdit()){ 
            setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } }); 
        } 
    };


    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row) => row.id !== id));
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

    // const processRowUpdate = (newRow: GridRowModel) => {
    //     alert("save success")
    //     const updatedRow = { ...newRow, isNew: false };
    //     setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    //     return updatedRow;
    // };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    return (
        <Box
            sx={{
                height: '70vh',
                width: '78vw',
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
            <DataGrid
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={onSave}
                slots={{
                    toolbar: EditToolbar,
                }}
                slotProps={{
                    toolbar: { setRows, setRowModesModel },
                }}
            />
        </Box>
    );
})

export default Table;
