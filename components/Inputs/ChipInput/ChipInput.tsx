//NODE_MODULES
import classNames from 'classnames';
import { ChangeEvent, useState, KeyboardEvent, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import { FieldError } from 'react-hook-form';
// ------------------------------------------------------------------------

//DEPENDENCY
import { TInputBaseProps } from '../types/inputs';
import HelperTextShow from '@/components/HelperTextShow/HelperTextShow';
import ErrShow from '@/components/ErrShow/ErrShow';
// ------------------------------------------------------------------------

interface Props extends TInputBaseProps <string[]>{
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  helperText?: string;
  validationMessage?: string;
  defaultValue?:string[]
}

const ChipInput = (props: Props) => {
  const {
    value = [],
    defaultValue=[],
    onChangeValue,
    placeholder,
    className = '',
    disabled = false,
    error,
    helperText,
    validationMessage,
  } = props;

  const [inputValue, setInputValue] = useState<string>('');
  const [chips, setChips] = useState<string[]>(value);

  //handle add chip
  const handleAddChip = () => {
    if (inputValue.trim() && !chips.includes(inputValue.trim())) {
      const updatedChips = [...chips, inputValue.trim()];
      setChips(updatedChips);
      setInputValue('');
      if (onChangeValue) {
        onChangeValue(updatedChips);
      }
    }
  };

  //set chips if default value exist
  useEffect(()=>{
    if (defaultValue && defaultValue.length > 0) {
      setChips(defaultValue);  
    }
  },[defaultValue])

  //handle deleting chips
  const handleDeleteChip = (chipToDelete: string) => {
    const updatedChips = chips.filter((chip) => chip !== chipToDelete);
    setChips(updatedChips);
    if (onChangeValue) {
      onChangeValue(updatedChips);
    }
  };

  //handle clicking on Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddChip();
    }
  };

  //get helping text if exist to show error
  const getHelperText = () => {
    if (!error && !validationMessage) return helperText ?? '';
    if (!error) return validationMessage;
    return error.message;
  };

  return (
    <>
      <Box className={classNames(className, '!max-w-lg')}>
        <TextField
          variant="outlined"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          error={error?.message ? !!error : undefined}
          helperText={!error && helperText ? helperText : undefined}
          fullWidth
        />
        <Box sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {chips.map((chip, index) => (
            <Chip
              key={index}
              label={chip}
              onDelete={() => handleDeleteChip(chip)}
              disabled={disabled}
            />
          ))}
        </Box>
      </Box>
      {!!error?.message && <ErrShow err={getHelperText() || ''} />}
      {!!helperText && (!error || !error.message) && (
        <HelperTextShow err={helperText} />
      )}
    </>
  );
};

export default ChipInput;
