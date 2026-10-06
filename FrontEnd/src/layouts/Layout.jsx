import React from 'react'
import { Outlet } from 'react-router'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Layout() {
    return (
        <div className='min-h-dvh flex flex-col justify-between'>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}
