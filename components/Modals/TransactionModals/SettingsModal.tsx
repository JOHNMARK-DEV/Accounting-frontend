import { Interests, Label } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Autocomplete, FormGroup, FormControlLabel, Checkbox, Stack, Button, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, FormLabel, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { register } from "module";
import React, { Dispatch, forwardRef, memo, useEffect, useReducer, useState } from "react";
import { Interface } from "readline";
import useStore from "@/store/store";

import { useRouter } from 'next/navigation';

interface formData {
  book: String, 
  month: String,
  year: String,
}

interface ISettings {
  formState: formData | any,
  setSelectionState: React.Dispatch<React.SetStateAction<formData | any>>,
  openModal: Boolean | any,
  onClose:  () => void  
}
const SettingsModal: React.FC<ISettings> = ({ formState, setSelectionState, openModal = false,onClose }: ISettings) => {
  const currentDate = new Date().toLocaleDateString();
  const [toggleModal, setToggleModal] = useState(openModal)
  const router = useRouter()
  const { BooksList, getBooks, CurrencyList, getCurrency }: any = useStore()

  const handleSelectedValues = () => {
    if (formState?.Book != 0, formState?.Currency != 0) {
      // setSelectionState({ ...formState, month: currentDate, year: 0, book_id: 0, })
      setToggleModal(() => false)
      onClose()
    }
  }

  const handleCancel = () => { 
    setToggleModal(() => false)
  }

  useEffect(() => {
    getBooks();
    getCurrency();

    setSelectionState({ ...formState, month: currentDate, year: 0, book_id: 0, })
  }, [])

  return (
    <Dialog open={toggleModal} fullWidth>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box>
          {/* <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={BooksList ? BooksList.map((book: any) => ({ Label: book.code, Value: book.id })) : []}
            getOptionLabel={(option: any) => option.Label}
            sx={{ width: 300, marginTop: "20px" }}
            onChange={(event, newValue) => setSelectionState({ ...formState, book: newValue })}
            renderInput={(params) => <TextField {...params} label="Books" />}
          /> */}
          <Grid container xs={12}>
            <Grid item xs={12}>
              <FormLabel className="mt-4">Month</FormLabel>
              <FormControl fullWidth>
                <Select
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                  }}
                >
                  <MenuItem value={1}>January</MenuItem>
                  <MenuItem value={2}>Febuary</MenuItem>
                  <MenuItem value={3}>March</MenuItem>
                  <MenuItem value={4}>April</MenuItem>
                  <MenuItem value={5}>May</MenuItem>
                  <MenuItem value={6}>June</MenuItem>
                  <MenuItem value={7}>July</MenuItem>
                  <MenuItem value={8}>Augost</MenuItem>
                  <MenuItem value={9}>September</MenuItem>
                  <MenuItem value={10}>October</MenuItem>
                  <MenuItem value={11}>November</MenuItem>
                  <MenuItem value={12}>December</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel className="mt-4">Year</FormLabel>
              <FormControl fullWidth>
                <Select
                  MenuProps={{
                    anchorOrigin: {
                      vertical: "bottom",
                      horizontal: "left",
                    },
                    transformOrigin: {
                      vertical: "bottom",
                      horizontal: "center",
                    },
                  }}
                >
                  <MenuItem value={2024}>2024</MenuItem>
                  <MenuItem value={2025}>2025</MenuItem> 
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Stack spacing={2} direction="row" justifyContent="center" marginTop={10}
            alignItems="center"  >
            <Button variant="contained" onClick={handleSelectedValues} style={{ backgroundColor: 'green' }}>
              Select
            </Button>
            <Button variant="contained" onClick={handleCancel} style={{ backgroundColor: 'red' }} >
              Cancel
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog >
  )
}




// const SettingsModal: React.<FC> = forwardRef(({ openModal: boolean = false, onSelectedValues: (data: any) => void})) => {

// }
export default SettingsModal;