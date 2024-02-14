'use client'
import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useState } from 'react';

interface CustomButtonsProps {
  ButtonNames: string[];
  isShowSaveBtn?: boolean | true;
  onClickAdd?: () => void | undefined;
  onClickEdit?: () => void | undefined;
  onClickDelete?: () => void | undefined;
  onClickCancelTrans?: () => void | undefined;
  onClickPrint?: () => void | undefined;
  onClickPrev?: () => void | undefined;
  onClickNext?: () => void | undefined;
  onClickSave?: () => void | undefined;
  onClickCancel?: () => void | undefined;

  onAddEntry?: () => void | undefined;
  onRemoveEntry?: () => void | undefined;
}
export default function CustomButtons({ ButtonNames, isShowSaveBtn, onClickAdd, onClickEdit, onClickDelete, onClickCancelTrans, onClickPrint, onClickPrev, onClickNext, onClickSave, onClickCancel,onAddEntry,onRemoveEntry }: CustomButtonsProps) {

  isShowSaveBtn = isShowSaveBtn === undefined ? true : isShowSaveBtn;

  const [toggle, setToggle] = useState(true);
  const availableButtons = Array.isArray(ButtonNames) ? ButtonNames : [];
  const TriggerFunc = (ButtonName: string | undefined): (() => void) | undefined => {
    setToggle(!toggle);
    switch (ButtonName) {
      case 'Add':
        return onClickAdd;
      case 'Edit':
        return onClickEdit;
      case 'Delete':
        return onClickDelete;
      case 'CancelTrans':
        return onClickCancelTrans;
      case 'Print':
        return onClickPrint;
      case 'Prev':
        return onClickPrev;
      case 'Next':
        return onClickNext;
      case 'Save':
        return onClickSave;
      case 'Cancel':
        return onClickCancel;
      case 'Add Entry':
        return onAddEntry;
      case 'Remove Entry':
        return onRemoveEntry;
      default:
        return undefined;
    }
  };

  const handleButtonClick = (buttonName: string) => {
    const clickHandler = TriggerFunc(buttonName);
    // console.log(clickHandler);
    if (clickHandler) {
      clickHandler(); // Call the returned function
    } else {
      console.log('No click handler for this button');
    }
  };

  return (
    <>
      {toggle ? (
        <Stack spacing={2} direction="row">
          {availableButtons.map((buttonName, index) => (
            <Button
              key={index}
              variant="contained"
              style={{ backgroundColor: '#757de8' }}
              onClick={(() => handleButtonClick(buttonName))}
            >
              {buttonName}
            </Button>
          ))}
        </Stack>
      ) : (
        isShowSaveBtn ? (
          <Stack spacing={2} direction="row">
            <Button variant="contained" onClick={() => handleButtonClick("Save")} style={{ backgroundColor: 'green' }}>
              Save
            </Button>
            <Button variant="contained" onClick={() => handleButtonClick("Cancel")} style={{ backgroundColor: 'red' }} >
              Cancel
            </Button>
          </Stack>
        ) :
          <Stack spacing={2} direction="row">
            {availableButtons.map((buttonName, index) => (
              <Button
                key={index}
                variant="contained"
                style={{ backgroundColor: '#757de8' }}
                onClick={(() => handleButtonClick(buttonName))}
              >
                {buttonName}
              </Button>
            ))}
          </Stack>

      )}
    </>
  );
}

