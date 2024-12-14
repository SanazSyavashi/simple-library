/* eslint-disable @typescript-eslint/no-explicit-any */
//NODED-MODULES
import { ChangeEvent } from 'react';
import { TextField } from '@mui/material';
import { FieldError } from 'react-hook-form';
//IMP-DEPENDENCY☺
import { TInputBaseProps } from '../types/inputs';
import ErrShow from '@/components/ErrShow/ErrShow';

//---------------------------------------------------------------------------------

interface Props extends TInputBaseProps {
  disabled?: boolean;
  className?: string;
  rows?: number;
  error?: FieldError;
  validationMessage?: string;
  helperText?: string;
}

//--------------------------------------------------------------------------------
const TextAreaInput = (props: Props): any => {
  const {
    value,
    onChangeValue,
    onMouseDown,
    onMouseUp,
    onFocus,
    placeholder,
    className = '',
    disabled = false,
    rows = 4,
    error,
    helperText,
    onBlur,
    validationMessage,
    name,
  } = props;

  //handle change
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    if (onChangeValue) {
      onChangeValue(e.target.value);
    }
  };

  //get helper text if exist to show errors
  const getHelperText = () => {
    if (!error && !validationMessage) return helperText ?? '';
    if (!error) return validationMessage;
    return error.message;
  };

  return (
    <>
      <TextField
        value={value ? value: ''}
        onChange={handleChange}
        placeholder={(placeholder)}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={onFocus}
        disabled={disabled}
        className={className}
        multiline
        rows={rows}
        error={error?.message ? !!error : undefined}
        onBlur={onBlur}
        name={name}
      />
      {!!error?.message && <ErrShow err={getHelperText()||''} />}
    </>
  );
};

export default TextAreaInput;
