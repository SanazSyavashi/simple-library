/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Page from "@/components/Pages/Page";
import Books from "./Books";
import AddEdit from "./add/edit/AddEditModal";
import { useState } from "react";
import GButton from "@/components/Button/components/GButton";
import GenericSnackbar from "@/components/Snackbar/GenericSnackbar";

function Main() {
  const[isAddModalOpen,setIsAddModalOpen]=useState<boolean>(false);
  const [books, setBooks] = useState<any[]>([]);
   const[snackbarText,setSnackbarText]=useState('')
      const[isSnackbarOpen,setIsSnackbarOpen]=useState(false)

  const onCloseAddModal=()=>setIsAddModalOpen(false)

  const handleSubmitAddModal=async (data: Record<string, any>)=>{
    const res = await fetch(`http://localhost:3001/books/`,{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
  })
  reload()
  setSnackbarText("The Book Added Successfully")
  setIsSnackbarOpen(true)
  }

  const reload=async ()=>{
      try {
        const res = await fetch('http://localhost:3001/books/');
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      } 
  }

  const handleAddBookButtonClick=()=> setIsAddModalOpen(true)
  return (
    <>
<Page title="Library Manager" 
titleComponent={
  <GButton title="Add Book + " onClick={handleAddBookButtonClick} color="secondary" className="mt-20"/>
}
>
  <Books   reload={reload} books={books}/>
  <AddEdit title={"Add Book"} isModalOpen={isAddModalOpen} onClose={onCloseAddModal} onSubmit={handleSubmitAddModal} />
</Page>
<GenericSnackbar severity={'success'} text={snackbarText} open={isSnackbarOpen} handleClose={function (): void {
      setIsSnackbarOpen(false)
    }} />
</>
  );
}
export default Main;