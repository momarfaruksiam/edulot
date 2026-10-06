import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Watch from '../pages/Watch'
import Layout from '../layouts/Layout'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'watch', element: <Watch /> },
            { path: '*', element: <div>404 Not Found</div> }
        ]
    }
])

export default router