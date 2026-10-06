import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import {
    HiHome,
    HiUserGroup,
    HiAcademicCap,
    HiBuildingOffice2,
    HiVideoCamera,
    HiDocumentText,
    HiBookmark,
    HiChatBubbleLeftRight,
    HiBell,
    HiCalendarDays,
    HiChartBar,
    HiCog6Tooth
} from 'react-icons/hi2'
import { FaSignOutAlt } from 'react-icons/fa'

export default function SideNav({ openMenu }) {
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        // Initial check in case page starts scrolled
        handleScroll()

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const menu = [
        { link: '/', title: 'Home', icon: <HiHome /> },
        { link: '/courses', title: 'Courses', icon: <HiAcademicCap /> },
        { link: '/connections', title: 'Connections', icon: <HiUserGroup /> },
        { link: '/messages', title: 'Messages', icon: <HiChatBubbleLeftRight /> },
        { link: '/notifications', title: 'Notifications', icon: <HiBell /> },
        { link: '/institutions', title: 'Institutions', icon: <HiBuildingOffice2 /> },
        { link: '/live-class', title: 'Live Class', icon: <HiVideoCamera /> },
        { link: '/notes', title: 'Notes', icon: <HiDocumentText /> },
        { link: '/saved', title: 'Saved', icon: <HiBookmark /> },
        { link: '/schedule', title: 'Schedule', icon: <HiCalendarDays /> },
        { link: '/analytics', title: 'Analytics', icon: <HiChartBar /> },
        { link: '/settings', title: 'Settings', icon: <HiCog6Tooth /> },
    ]

    const location = useLocation()


    return (
        <div
            className={`sticky top-0 overflow-hidden
            ${isScrolled
                    ? 'h-dvh'
                    : 'max-h-[calc(100dvh-140px)] md:max-h-[calc(100dvh-100px)]'
                }
            ${openMenu ? 'max-w-60 p-2 pt-8' : 'max-w-0 p-0'}
            md:max-w-60 md:p-2 md:pt-8`}
        >
            <div className="h-full w-full overflow-y-auto">
                <ul className="space-y-1">
                    {menu.map((item) => {
                        const isActive = location.pathname === item.link

                        return (
                            <li key={item.link}>
                                <Link
                                    to={item.link}
                                    title={item.title}
                                    className={`flex items-center gap-3 p-3 rounded-lg text-subtext hover:bg-card hover:text-text whitespace-nowrap ${isActive
                                        ? 'bg-card text-text'
                                        : 'text-subtext hover:bg-card hover:text-text'
                                        }`}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                    <span className={`${openMenu ? 'block' : 'hidden'}`}>
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                    <li className={`flex items-center gap-3 p-3 mt-8 border-t border-border text-subtext hover:bg-card hover:text-text whitespace-nowrap}`}>
                        <span className="text-xl"><FaSignOutAlt /></span>
                        <span >
                            Sign Out
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}