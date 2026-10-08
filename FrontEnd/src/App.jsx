import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import router from './routes/router'
import { UserProvider } from './contexts/userContext'

export default function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </UserProvider>
    </>
  )
}