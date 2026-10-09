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

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setShowLowerNav(false)
            } else {
                setShowLowerNav(true)
            }

            lastScrollY = currentScrollY
        }

        window.addEventListener('scroll', handleScroll, {
            passive: true,
        })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className="flex min-h-dvh min-w-0 flex-col justify-between overflow-x-hidden">
            <Nav
                setOpenMenu={setOpenMenu}
                openMenu={openMenu}
            />

            <div
                className={`relative flex min-w-0 flex-1 md:mb-1 ${
                    showLowerNav ? 'mb-15 mt-1' : 'mb-0 mt-0'
                }`}
            >
                <SideNav
                    openMenu={openMenu}
                    setOpenMenu={setOpenMenu}
                />

                <div
                    className={`relative min-w-0 flex-1 border-l-2 border-border p-2 ${
                        openMenu
                            ? 'max-h-dvh overflow-hidden'
                            : ''
                    }`}
                >
                    {openMenu && (
                        <div
                            onClick={() => setOpenMenu(false)}
                            className="absolute inset-0 z-20 bg-subtext/50 opacity-50 transition-opacity duration-300"
                        />
                    )}

                    <div className="min-w-0 max-w-full">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ul
                className={`fixed bottom-0 left-0 z-30 flex w-full select-none items-center justify-center gap-4 bg-bg p-2 text-2xl font-medium text-subtext shadow-[0_-4px_6px_-1px_color-mix(in_srgb,var(--color-text)_20%,transparent)] transition-transform duration-300 ease-in-out md:hidden ${
                    showLowerNav
                        ? 'translate-y-0'
                        : 'translate-y-full'
                }`}
            >
                <LowerNav />
            </ul>
        </div>
    )
}