import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Watch from '../pages/Watch'
import Layout from '../layouts/Layout'
import SignIn from '../pages/SignIn'
import SignUp from '../pages/SignUp'
import AuthGuard from '../components/AuthGuard'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'watch', element: <Watch /> },
            {
                path: 'sign-in', element: <AuthGuard
                    unauthComponent={<SignIn />} />
            },
            { path: 'sign-up', element: <SignUp /> },
            { path: '*', element: <div>404 Not Found</div> }
        ]
    }
])

export default router