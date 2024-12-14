/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import classNames from 'classnames';
import { FieldError } from 'react-hook-form';
import { TInputBaseProps } from '../types/inputs';
import HelperTextShow from '@/components/HelperTextShow/HelperTextShow';
import ErrShow from '@/components/ErrShow/ErrShow';
import GButton from '@/components/Button/components/GButton';
import { CircularProgress } from '@mui/material';
import GenericSnackbar from '@/components/Snackbar/GenericSnackbar';

interface Props extends TInputBaseProps<any> {
  disabled?: boolean;
  className?: string;
  error?: FieldError;
  helperText?: string;
  validationMessage?: string;
  onChangeValue?: (imagePath: string) => void;
  multiple?: true;
}

const FilePicker = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); 
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false)

  const {
    onChangeValue,
    placeholder,
    className = '',
    disabled = false,
    error,
    onBlur,
    name,
    helperText,
    validationMessage,
    multiple = false,
  } = props;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setUploadError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setIsLoading(true); 
    setUploadError(null);

    try {
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        const fileName = `uploadPic`;

        localStorage.setItem(fileName, base64String);

        if (onChangeValue) {
          onChangeValue(fileName); 
        }
        window.dispatchEvent(new Event('profileImageChange'));

        setTimeout(() => {
          setUploading(false);
          setIsLoading(false); 
          setIsSnackbarOpen(true)
        }, 1000); 
      };

      reader.onerror = () => {
        setUploadError('Error reading file');
        setUploading(false);
        setIsLoading(false);
      };

      reader.readAsDataURL(selectedFile);
      
    } catch (err) {
      setUploadError('Error saving file'+err);
      setUploading(false);
      setIsLoading(false);
    }
  };

  const getHelperText = () => {
    if (!error && !validationMessage) return helperText ?? '';
    if (!error) return validationMessage;
    return error.message;
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className={classNames(
          'cursor-pointer text-primary',
          disabled && 'opacity-50 pointer-events-none',
          className
        )}
      >
        <div className="border border-gray-300 p-2 rounded-lg text-center">
          {selectedFile ? (
            <span>Selected file: {selectedFile.name}</span>
          ) : (
            <span>{placeholder || 'Select file'}</span>
          )}
        </div>
      </label>

      <input
        id={name}
        name={name}
        type="file"
        onChange={handleFileChange}
        disabled={disabled || uploading}
        className="hidden"
        onBlur={onBlur}
        multiple={multiple}
        accept="image/*"
      />
      {isLoading ? (
        <GButton
          className="mt-2 p-2 bg-blue-500 text-white rounded pt-4 disabled:opacity-50 h-12"
          title="Save Image"
        >
          <CircularProgress
            color="inherit"
            size="1rem"
            classes={{ root: 'mx-6' }}
          />
        </GButton>
      ) : (
        <GButton
          onClick={handleUpload}
          disabled={uploading || !selectedFile}
          className="h-10 mt-2 p-2 bg-blue-500 text-white rounded disabled:opacity-50"
          title="Save File"
        />
      )}

      {!!uploadError && <ErrShow err={uploadError} />}
      {!!error?.message && !!error && <ErrShow err={getHelperText() || ''} />}
      {!!helperText && (!error || !error.message) && <HelperTextShow err={helperText} />}
      <GenericSnackbar severity={'success'} text={'Profile Picture saved successfully'} open={isSnackbarOpen} handleClose={function (): void {
        setIsSnackbarOpen(false)
      }} />
    </div>
  );
};

export default FilePicker;

// Helper function to get image from localStorage
export const getStoredImage = (fileName: string): string | null => {
  return localStorage.getItem(fileName);
};
