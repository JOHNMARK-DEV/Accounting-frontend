import { Interests, Label } from "@mui/icons-material";
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Autocomplete, FormGroup, FormControlLabel, Checkbox, Stack, Button, Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { register } from "module";
import React, { Dispatch, forwardRef, memo, useEffect, useReducer, useState } from "react";
import { Interface } from "readline";
import useStore from "@/store/store";

import { useRouter } from 'next/navigation';

interface ISettings {
  Begbal_date?: String,
  Book?: Number,
  Currency?: Number,
  openModal?: Boolean,
  onSelectedValues?: (data: any) => void

}
const SettingsModal: React.FC<ISettings> = forwardRef(({ Begbal_date, Book, Currency, openModal = false, onSelectedValues }, ref) => {
  const currentDate = new Date().toLocaleDateString();
  const [toggleModal, setToggleModal] = useState(true)
  const [formData, setFormData] = useState<ISettings>() 
  const router = useRouter() 
  const { BooksList, getBooks, CurrencyList, getCurrency }: any = useStore()

  const handleSelectedValues = () => {
    if (formData?.Book != 0, formData?.Currency  != 0) {
      onSelectedValues?.(formData)
      setToggleModal(() => false)
    } 
  }

  const handleCancel = () => {
    router.push('/Dashboard');
    setToggleModal(() => false)
  }

  useEffect(() => {
    getBooks();
    getCurrency();

    setFormData({ ...formData, Begbal_date: currentDate, Currency: 0, Book: 0, })
  }, [])

//  console.log('BooksList',BooksList);

  return (
    <Dialog open={toggleModal}>
      <DialogTitle>Settings</DialogTitle>
      <DialogContent>
        <Box>
          <TextField className="mt-4" type="label" label="Beginning Balance Date" value={currentDate} fullWidth InputLabelProps={{ shrink: true }} ></TextField>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={BooksList ? BooksList.map((book: any) => ({ Label: book.code, Value: book.id })) : []}
            getOptionLabel={(option: any) => option.Label}
            sx={{ width: 300, marginTop: "20px" }}
            onChange={(event, newValue) => setFormData({ ...formData, Book: newValue })}
            renderInput={(params) => <TextField {...params} label="Books" />}
          />
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={CurrencyList ? CurrencyList.map((currency: any) => ({ Label: currency.name, Value: currency.id })) : []}
            getOptionLabel={(option: any) => option.Label}
            sx={{ width: 300, marginTop: "20px" }}
            onChange={(event, newValue) => setFormData({ ...formData, Currency: newValue })}
            renderInput={(params) => <TextField {...params} label="Currency" />}
          />

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
})




// const SettingsModal: React.<FC> = forwardRef(({ openModal: boolean = false, onSelectedValues: (data: any) => void})) => {

// }
export default SettingsModal;