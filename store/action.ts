// actions.ts
import { Action } from 'redux';

export interface SetRowsAction extends Action {
  type: 'SET_ROWS';
  payload: any; // Replace YourRowType with the actual type of your rows
}

export const setRows = (rows: any): SetRowsAction => ({
  type: 'SET_ROWS',
  payload: rows,
});
