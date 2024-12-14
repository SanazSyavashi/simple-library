/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import GeneralForm from "@/components/GeneralForm/GeneralForm";
import Modal from "@/components/Modal/Modal";
import { basFields } from "./fields";

const AddEdit=({title,isModalOpen,onClose,onSubmit,defaultValue,isLoading}:TAddEditModal)=>{

    //HANDLE SUBMITING OF THE FORM
    const handleFormSubmit:any = (data: Record<string, any>) => {
      onSubmit(data)
    };

   const  content=<GeneralForm
  fields={basFields}
  onSubmit={handleFormSubmit}
  onCancel={onClose}
  isDataLoading={isLoading??false}
  defaultValues={defaultValue??{}}
/>

return(
  <Modal title={title} content={content} onClose={onClose} isModalOpen={isModalOpen} fullWidth />

)
}

export default AddEdit;

type TAddEditModal={
  title:string,
  isModalOpen:boolean,
  onClose:()=>void,
  onSubmit:(data: Record<string, any>)=>void
  defaultValue?:Record<string, any>
  isLoading?:boolean}