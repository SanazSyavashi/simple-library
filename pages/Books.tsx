/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Page from '@/components/Pages/Page';
import Row from '@/pages/add/edit/Row/Row';
import TableHeader from '@/pages/add/edit/Row/TableHeader';
import{useEffect} from 'react'
import EmptyLibrary from './EmpltyLibrary';


const Books=({reload,books}:{reload:()=>void,books:any[]})=>{

  useEffect(() => {
    reload()
  }, []);
  if (!books.length) {
    return <EmptyLibrary />;
  }
    return(
     <Page >
      <TableHeader/>
      {
       books?.map(book=><Row key={book.id} title={book.title} author={book.author} isReading={book.isreading} id={book.id} rate={book.rating} reload={reload}/>)
      }
     </Page>
    ) } 

export default Books;