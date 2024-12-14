//NODE_MODULES
import classNames from 'classnames';
import { ChangeEvent } from 'react';
import TextField from '@mui/material/TextField';
import { FieldError } from 'react-hook-form';
import { Box } from '@mui/material';
//---------------------------------------------------
////DEPENDENCY
import { TInputBaseProps } from '../types/inputs';
import ErrShow from '@/components/ErrShow/ErrShow';
//---------------------------------------------------
interface Props extends TInputBaseProps {
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  validationMessage?: string;
  helperText?: string;
}
//----------------------------------------------------
const NumberInput = (props: Props) => {
  const {
    value,
    defaultValue,
    onChangeValue,
    placeholder,
    className = '',
    disabled = false,
    error,
    helperText,
    onBlur,
    validationMessage,
    name,
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
    <Box className='flex flex-col w-full'>
      <TextField
        name={name}
        variant='outlined'
        error={error?.message ? !!error : undefined}
        value={value ? value: defaultValue? defaultValue: ''}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={classNames(className, '!max-w-lg ')}
        onBlur={onBlur}
        type='number'
      />
      {!!error?.message && <ErrShow err={getHelperText()||''} />}
    </Box>
  );
};

export default NumberInput;
