import React from 'react'
import axios from 'axios'

const Interface = () => {
  const endPoint = axios.create({
    baseURL: "http://localhost:3000"
  })
  return  endPoint 
}

export default Interface
