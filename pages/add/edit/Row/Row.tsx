/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import React, { useState } from 'react';
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faBookOpen, faBook } from '@fortawesome/free-solid-svg-icons';
import AddEdit from '@/pages/add/edit/AddEditModal';
import GenericSnackbar from '../../../../components/Snackbar/GenericSnackbar';

const Row = ({
  title,
  author,
  isReading,
  id,
  rate,
  reload,
}: {
  title: string;
  author: string;
  isReading: boolean;
  id: string;
  rate:string;
  reload:()=>void;
}) => {
    const [books, setBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
    const[snackbarText,setSnackbarText]=useState('')
    const[isSnackbarOpen,setIsSnackbarOpen]=useState(false)


    const onCloseEditModal = () => setIsEditModalOpen(false)
  
    const handleSubmitEditModal = async (data: Record<string, any>) => {
      const res = await fetch(`http://localhost:3001/books/${id}`,{
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    reload();
    setIsSnackbarOpen(true)
    setSnackbarText("The Book Updates Successfully")
    }
    const onEditClickHandler=() => {
      setIsEditModalOpen(true)
      const fetchBooks = async () => {
        try {
          const res = await fetch(`http://localhost:3001/books/${id}`);
          const data = await res.json();
          setBooks(data);
        } catch (error) {
          console.error('Error fetching books:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBooks();
    }

    const onDeleteClickHandler=() => {
      const fetchBooks = async () => {
        try {
          const res = await fetch(`http://localhost:3001/books/${id}`,{
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
        });
          const data = await res.json();
          setIsSnackbarOpen(true)
          setSnackbarText('The Book Delete SuccessFully')
        } catch (error) {
          console.error('Error Deleting books:', error);
        } finally {
          reload();

        }
      };
  
      fetchBooks();
    }

    const onReadClickHandler=() => {
      const fetchBooks = async () => {
        try {
          const res = await fetch(`http://localhost:3001/books/status/${id}`,{
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"isReading":true}),
        });
          setIsSnackbarOpen(true)
          setSnackbarText('The Book Changed status to Read SuccessFully')
        } catch (error) {
          console.error('Error change status to Read books:', error);
        } finally {
          reload();

        }
      };
  
      fetchBooks();
    }

    const onUnReadClickHandler=() => {
      const fetchBooks = async () => {
        try {
          const res = await fetch(`http://localhost:3001/books/status/${id}`,{
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"isReading":false}),
        });
          setIsSnackbarOpen(true)
          setSnackbarText('The Book Changed status to UnRead SuccessFully')
        } catch (error) {
          console.error('Error change status to UnRead books:', error);
        } finally {
          reload();

        }
      };
  
      fetchBooks();
    }

  return (
    <>
    <Box 
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        justifyContent: 'space-between',
        alignItems: { xs: 'start', sm: 'center' },
        my: { xs: 3, sm: 4 },
        gap: { xs: 2, sm: 3 }
      }}
    >
      <Typography
        sx={{
          fontWeight: 'bold',
          fontSize: { xs: '1rem', md: '1.125rem' },
          color: 'text.primary',
          width: { sm: '25%' },
          mb: { xs: 1, sm: 0 }
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: { xs: '1rem', sm: '1rem' },
          color: 'text.primary',
          width: { sm: '25%' },
          wordBreak: 'break-all'
        }}
      >
        {author}
      </Typography>
      
      <Typography
        sx={{
          fontSize: { xs: '1rem', sm: '1rem' },
          color: 'text.primary',
          width: { sm: '25%' },
          wordBreak: 'break-all'
        }}
      >
        {rate}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          ml: 'auto',
          alignItems: 'center'
        }}
      >
        <Tooltip title={isReading ? 'UnRead' : 'Read'} arrow>
          <IconButton 
            onClick={() => isReading? onUnReadClickHandler():onReadClickHandler()}
            sx={{ color: isReading ? 'primary.main' : 'text.secondary' }}
          >
            <FontAwesomeIcon 
              icon={isReading ? faBookOpen : faBook}
              size="lg"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Edit" arrow>
          <IconButton 
            onClick={() => onEditClickHandler()}
            sx={{ color: 'text.secondary' }}
          >
            <FontAwesomeIcon 
              icon={faEdit}
              size="lg"
            />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete" arrow>
          <IconButton 
            onClick={() => onDeleteClickHandler()}
            sx={{ color: 'error.main' }}
          >
            <FontAwesomeIcon 
              icon={faTrashAlt}
              size="lg"
            />
          </IconButton>
        </Tooltip>
      </Box>
      <AddEdit title={"Edit Book"} isModalOpen={isEditModalOpen} onClose={onCloseEditModal} onSubmit={handleSubmitEditModal} defaultValue={books[0]} isLoading={loading}/>

    </Box>
    <GenericSnackbar severity={'success'} text={snackbarText} open={isSnackbarOpen} handleClose={function (): void {
      setIsSnackbarOpen(false)
    }} />
    </>
  );
};

export default Row;