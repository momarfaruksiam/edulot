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
import { useUser } from '../../contexts/userContext'

export default function LowerNav() {
    const{user} = useUser()
    const menu = [
        { link: '/', title: 'Home', icon: <HiHome /> },
        user && { link: '/connections', title: 'Connections', icon: <HiUserGroup /> },
        { link: '/courses', title: 'Courses', icon: <HiAcademicCap /> },
        user && { link: '/institutions', title: 'Institutions', icon: <HiBuildingOffice2 /> },
        { link: '/live-class', title: 'Live Class', icon: <HiVideoCamera /> },
        user && { link: '/notes', title: 'Notes', icon: <HiDocumentText /> },
    ].filter(Boolean)

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