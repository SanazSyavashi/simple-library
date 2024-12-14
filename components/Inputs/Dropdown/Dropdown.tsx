/* eslint-disable @typescript-eslint/no-explicit-any */
//NODE-MODULES
import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { Chip } from '@mui/material';
import { FieldError } from 'react-hook-form';
//IMP-DEPENDENCY
import {
  TAutoComplete,
  TDropdownOptions,
  TInputBaseProps,
} from '../types/inputs';
import classNames from 'classnames';
import ErrShow from '@/components/ErrShow/ErrShow';
//---------------------------------------------------------------------------------

interface Props extends TInputBaseProps<string|null, TDropdownOptions> {
  label?: string;
  size?: 'small' | 'medium';
  error?: FieldError;
  validationMessage?: string;
  helperText?: string;
  defaultValue?: string | null;
  autocomplete?: TAutoComplete;
  className?: string;
}

export default function Dropdown(props: Props) {
  const {
    onChangeValue,
    options,
    value='',
    placeholder,
    label,
    size,
    error,
    helperText,
    validationMessage,
    onBlur,
    defaultValue,
    autocomplete = 'off',
    disabled,
    name,
    className,
  } = props;




  //-----------------------------------------------------------------------------------

  //get helper text if exist to show errors
  const getHelperText = () => {
    if (!error && !validationMessage) return helperText ?? '';
    if (!error) return validationMessage;
    return error.message;
  };


  return (
    <>
      {label && (
        <InputLabel className='mb-2' id={`dropwdown-label-${label}`}>
          {label}
        </InputLabel>
      )}

      <Select
        disabled={disabled}
        size={size}
        labelId={`dropwdown-label-${label ?? ''}`}
        id={`dropwdown-${label ?? ''}`}
        className={classNames(className, '!max-w-lg !w-full')}
        onChange={onChangeValue as any}
        placeholder={placeholder}
        onBlur={onBlur}
        error={error?.message ? !!error : undefined}
        defaultValue={defaultValue}
        value={value !== null ? value : defaultValue? defaultValue: ''}
        autoComplete={autocomplete}
        name={name}>
        {defaultValue && (
          <MenuItem
            className='w-full'
            value={''}
            >
            {defaultValue}
          </MenuItem>
        )}

        {options?.map(
          ({ title, key, text, value: optValue }, i) => {
            return (
              <MenuItem
                className='w-full'
                key={i}
                value={optValue || key}
                >
                  <Chip
                    className='w-[5px] h-[5px] rounded-full mr-2'
                  />
                {text || title}
              </MenuItem>
            );
          },
        )}
      </Select>
      {!!error?.message && <ErrShow err={getHelperText()||''} />}
    </>
  );
}
