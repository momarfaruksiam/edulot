import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router'
import Nav from '../components/nav/Nav'
import LowerNav from '../components/nav/LowerNav'
import SideNav from '../components/nav/SideNav'

export default function Layout() {
    const [openMenu, setOpenMenu] = useState(false)
    const [showLowerNav, setShowLowerNav] = useState(true)

    useEffect(() => {
        let lastScrollY = window.scrollY

        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Hide when scrolling down, show when scrolling up
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowLowerNav(false)
            } else {
                setShowLowerNav(true)
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className='min-h-dvh flex flex-col justify-between'>

            <Nav setOpenMenu={setOpenMenu} openMenu={openMenu} />

            <div className={`relative flex-1 flex md:mb-1 ${showLowerNav ? 'mb-15 mt-1' : 'mb-0 mt-0'}`}>
                <SideNav openMenu={openMenu} setOpenMenu={setOpenMenu} />
                <div className={`relative border-l-2 border-border p-2 flex-1 ${openMenu && 'max-h-dvh overflow-hidden'}`}>
                    <div
                        onClick={() => setOpenMenu(false)}
                        className={`absolute top-0 left-0 right-0 bg-subtext/50 opacity-50 ${openMenu && 'bottom-0'} transition-opacity duration-300`} />
                    <Outlet />
                </div>
            </div>

            <ul
                className={`fixed bottom-0 left-0 w-full p-2 bg-bg z-30 md:hidden
                flex items-center justify-center gap-4 text-2xl font-medium text-subtext select-none
                shadow-[0_-4px_6px_-1px_color-mix(in_srgb,var(--color-text)_20%,transparent)] 
                transition-transform duration-300 ease-in-out ${showLowerNav ? 'translate-y-0' : 'translate-y-full'
                    }`}
            >
                <LowerNav />
            </ul>
        </div>
    )
}