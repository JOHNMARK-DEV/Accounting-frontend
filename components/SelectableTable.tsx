import * as React from 'react';
import { DataGrid,GridToolbar , GridActionsCellItem, GridColDef, GridValueGetterParams, GridRowId, GridRowsProp } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { ChildProps } from 'postcss';
import { forwardRef } from 'react';


interface ITable {
  _cols: GridColDef[],
  _rows: GridRowsProp,
  onSave?: (data: any) => void;
  onDelete?: (id: GridRowId) => void;
  onCancel?:  (id: GridRowId) => void;
  parentRef: React.RefObject<ChildProps | null>;
}

// const columns: GridColDef[] = [ 
//   { field: 'Code', headerName: 'Code', width: 130 },
//   { field: 'Name', headerName: 'Name', width: 130 },
//   { field: 'Validation', headerName: 'Validation', width: 120 },
//   { field: 'Class', headerName: 'Class', width: 100 },
//   { field: 'Group', headerName: 'Group', width: 100 }, 
//   { field: 'Date', headerName: 'Date', width: 100 }, 
//   { field: 'Debit', headerName: 'Debit', width: 170 }, 
//   { field: 'Credit', headerName: 'Credit', width: 170 }, 
//   { field: 'BasedDebit', headerName: 'Based Debit', width: 170 }, 
//   { field: 'BasedCredit', headerName: 'Based Credit', width: 170 }, 
//   { field: 'Importation', headerName: 'For Importation', width: 170 }, 
//   { field: 'Restatement', headerName: 'Restatement', width: 170 }, 
//   { field: 'UnitApplicable', headerName: 'Unit Applicable', width: 170 }, 
//   { field: 'NoCompute', headerName: 'No Compute', width: 170 }
  
// ] 

// const rows = [ 
//   { id: 1, Code: '1-1000001',Importation: 'Yes', Restatement: 'Yes', UnitApplicable: 'Yes', NoCompute: 'Yes', Date: 'Jon',Name: 'Jon',Validation: 'Cash / Bank', Class: 35, Group: 35 , Debit:"PHP 1,222,234,234,123.00", Credit: "PHP 1,234,234,123.00", BasedDebit: "PHP 1,234,234,123.00", BasedCredit: "PHP 1,234,234,123.00" },  
//   { id: 2, Code: '1-1000002',Importation: 'Yes', Restatement: 'Yes', UnitApplicable: 'Yes', NoCompute: 'Yes', Date: 'Jon',Name: 'Jon',Validation: 'Cash / Bank', Class: 35, Group: 35 , Debit: "PHP 1,234,234,123.00", Credit: "PHP 1,234,234,123.00", BasedDebit: "PHP 1,234,234,123.00", BasedCredit: "PHP 1,234,234,123.00" },  
//   { id: 3, Code: '1-1000003',Importation: 'Yes', Restatement: 'Yes', UnitApplicable: 'Yes', NoCompute: 'Yes', Date: 'Jon',Name: 'Jon',Validation: 'Cash / Bank', Class: 35, Group: 35 , Debit: "PHP 1,234,234,123.00", Credit: "PHP 1,234,234,123.00", BasedDebit: "PHP 1,234,234,123.00", BasedCredit: "PHP 1,234,234,123.00" },  
// ];

const SelectableTable: React.FC<ITable> = forwardRef(({ onSave, onDelete,onCancel, _cols, _rows }, ref) => {
  return (
    <div style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
      <DataGrid
        density="compact"
        rows={_rows}
        columns={_cols} 
        pageSizeOptions={[20]}
        checkboxSelection
        // slots={{ toolbar: GridToolbar }}
      />
    </div>
  );
})
export default SelectableTable;