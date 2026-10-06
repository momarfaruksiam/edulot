import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import LowerNav from '../components/LowerNav'
import SideNav from '../components/SideNav'

export default function Layout() {
    const [openMenu, setOpenMenu] = useState(false)
    return (
        <div className='min-h-dvh flex flex-col justify-between'>

            <Nav setOpenMenu={setOpenMenu} openMenu={openMenu} />

            <div className='flex-1 flex'>
                <SideNav openMenu={openMenu} />
                <div className='relative border-l-2 border-border p-2'>
                    <Outlet />
                </div>
            </div>

            <ul
                className="flex items-center justify-center gap-6 text-2xl font-medium text-subtext select-none bg-bg z-9
                
                shadow-[0_-4px_6px_-1px_color-mix(in_srgb,var(--color-text)_20%,transparent)] 
                
                sticky bottom-0 left-0 w-full p-4
                 
                md:hidden">
                <LowerNav />
            </ul>
        </div>
    )
}
