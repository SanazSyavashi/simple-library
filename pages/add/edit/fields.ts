//DEPENDENCY
import { FieldConfig } from "@/components/GeneralForm/GeneralForm";
//-----------------------------------------------------------------

//FIELDS OF BASIC FORM WHICH LOAD DYNAMICALLY
export const basFields: FieldConfig[] = [
  {
    name: 'title',
    label: 'Book Title',
    type: 'text',
    rules: {
      required: {
        value: true,
         message: "Please fill out this field"
      }, 
    },
  },
  {
    name: 'author',
    label: 'Author Name',
    type: 'text',
    rules: {
      required: {
        value: true,
         message: "Please fill out this field"
      },
    },
  },
  {
    name: 'isreading',
    label: 'Reading Status',
    type: 'switch',
  },
  {
    name: 'rating',
    label: 'Book Rating',
    type: 'number',
    rules: {
      required: {
        value: true,
         message: "Please fill out this field"
      },
        minLength: { value: 1, message: "Minimum 1 characters required" },
        maxLength: { value: 4, message: "Maximum 4 characters allowed" }
    },
  },
];