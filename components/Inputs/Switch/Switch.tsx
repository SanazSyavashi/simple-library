/* eslint-disable @typescript-eslint/no-explicit-any */
import { Switch} from '@mui/material';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';
import ErrShow from '@/components/ErrShow/ErrShow';
import HelperTextShow from '@/components/HelperTextShow/HelperTextShow';

//--------------------------------------------------------- 
//DEPENDENCY
import { TInputBaseProps } from '../types/inputs';

//---------------------------------------------------------
interface Props extends TInputBaseProps<boolean> {
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
  onMouseDown?: () => void;
  onMouseUp?: () => void;
  onFocus?: () => void;
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  helperText?: string;
  validationMessage?: string;
  name?: string;
  required?: boolean;
  size?: 'small' | 'medium';
}

const SwitchInput = (props: Props) => {
  const {
    value = false,
    onChangeValue,
    onMouseDown,
    onMouseUp,
    onFocus,
    onBlur,
    disabled = false,
    className = '',
    error,
    helperText,
    validationMessage,
    name,
    required = false,
    size = 'medium',
  } = props;

  // handle change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChangeValue) {
      onChangeValue(event.target.checked);
    }
  };

  // get helper text if exist to show errors
  const getHelperText = () => {
    if (!error && !validationMessage) return helperText ?? '';
    if (!error) return validationMessage;
    return error.message;
  };

  return (
    <>
          <Switch
            name={name}
            checked={value}
            onChange={handleChange}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onFocus={onFocus}
            onBlur={onBlur}
            disabled={disabled}
            required={required}
            size={size}
            className={classNames(
              className,
              error?.message ? 'text-red-500' : '',
              disabled ? 'opacity-50 cursor-not-allowed' : ''
            )}
            color={error?.message ? 'error' : 'primary'}
          />
      {!!error?.message && !!error && (
        <ErrShow err={getHelperText() || ''} />
      )}
      
      {!!helperText && (!error || !error.message) && (
        <HelperTextShow err={helperText} />
      )}
</>
  );
};

export default SwitchInput;