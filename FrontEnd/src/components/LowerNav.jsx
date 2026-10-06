import React from 'react'
import { Link, useLocation } from 'react-router'
import {
    HiHome,
    HiUserGroup,
    HiAcademicCap,
    HiBuildingOffice2,
    HiVideoCamera,
    HiDocumentText,
} from 'react-icons/hi2'

export default function LowerNav() {
    const menu = [
        { link: '/', title: 'Home', icon: <HiHome /> },
        { link: '/connections', title: 'Connections', icon: <HiUserGroup /> },
        { link: '/courses', title: 'Courses', icon: <HiAcademicCap /> },
        { link: '/institutions', title: 'Institutions', icon: <HiBuildingOffice2 /> },
        { link: '/live-class', title: 'Live Class', icon: <HiVideoCamera /> },
        { link: '/notes', title: 'Notes', icon: <HiDocumentText /> },
    ]

    const location = useLocation()


    return (
        <>
            {menu.map((item) => {
                const isActive = location.pathname === item.link

                return (
                    <li key={item.link}>
                        <Link
                            to={item.link}
                            title={item.title}
                            className={`block rounded-lg p-2 whitespace-nowrap text-2xl transition-colors ${isActive
                                ? 'bg-card text-text'
                                : 'text-subtext hover:bg-card hover:text-text'
                                }`}
                        >
                            {item.icon}
                        </Link>
                    </li>
                )
            })}
        </>
    )
}