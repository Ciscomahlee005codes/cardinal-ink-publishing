import React from 'react'
import { useEffect, useState } from 'react'
import  endPoint  from '../API/Interface';

const useBooks = () => {
    const [bookCollection, setBookCollection] = useState([]);

    useEffect(()=>{
        const bookRequest = async() =>{
            try {
               const requestAllBooks = await endPoint.get("/books")
               const res = requestAllBooks.data
               setBookCollection(res.books)
            } catch (error) {
                console.error("Error",error)
            }
        }
        bookRequest();
    }, [])
  return { bookCollection }
}

export default useBooks
