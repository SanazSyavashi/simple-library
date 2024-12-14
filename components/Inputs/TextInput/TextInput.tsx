/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { FieldError } from 'react-hook-form';
//---------------------------------------------------------
//DEPENDENCY
import { TInputBaseProps } from '../types/inputs';
import HelperTextShow from '@/components/HelperTextShow/HelperTextShow';
import ErrShow from '@/components/ErrShow/ErrShow';
//---------------------------------------------------------
interface Props extends TInputBaseProps {
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  helperText?: string;
  validationMessage?: string;
}
const TextInput = (props: Props) => {
  const {
    value,
    onChangeValue,
    onMouseDown,
    onMouseUp,
    onFocus,
    onKeyDown,
    placeholder,
    className = '',
    disabled = false,
    error,
    onBlur,
    name,
    helperText,
    validationMessage,
  } = props;

  //handle changing
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
        name={name}
        variant='outlined'
        error={error?.message ? !!error : undefined}
        value={value ?? ''}
        onChange={handleChange}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        className={classNames(className, '!max-w-lg')}
        onBlur={onBlur}
      />
      {!!error?.message && !!error && <ErrShow err={getHelperText()||''} />}
      {!!helperText && (!error || !error.message) && (
        <HelperTextShow err={helperText} />
      )}
      </>
  );
};

export default TextInput;
