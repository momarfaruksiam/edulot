import React, { useState } from 'react'
import Search from '../Search'
import { FaSearch, FaUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { RiMenu2Fill } from "react-icons/ri";
import { Link, useLocation } from 'react-router'
import {
    HiChatBubbleLeftRight,
    HiBell,
    HiUser,
} from 'react-icons/hi2'
import { useUser } from '../../contexts/userContext';

export default function Nav({ setOpenMenu, openMenu }) {
    const [openSearch, setOpenSearch] = useState(false)

    const { user } = useUser()


    const menu = [
        user && { link: '/notifications', title: 'Notifications', icon: <HiBell /> },
        user && { link: '/messages', title: 'Messages', icon: <HiChatBubbleLeftRight /> },

    ].filter(Boolean)

    const location = useLocation()


    return (
        <header className='bg-bg p-4 w-full shadow shadow-text/20 select-none z-10'>
            <nav className='flex justify-between items-center flex-wrap gap-2 w-full'>

                <div className='order-1 flex gap-4 items-center'>
                    <RiMenu2Fill
                        className='h-8 p-1 rounded w-auto text-main hover:bg-subtext/10'
                        onClick={() => setOpenMenu(!openMenu)} />
                    <h1 className='text-2xl font-bold text-main'>EduLot</h1>
                </div>

                <div className={`ml-auto
                order-3 w-full ${openSearch ? 'block' : 'hidden'}
                md:order-2 md:w-auto md:block`}>
                    <Search />
                </div>

                <ul
                    className='flex items-center text-xl gap-2 font-medium text-subtext
                order-2 
                md:order-3'>
                    <li
                        className='md:hidden block rounded-lg p-2 text-subtext hover:bg-card hover:text-text whitespace-nowrap'
                        onClick={() => setOpenSearch(!openSearch)}>
                        {openSearch ? <RxCross1 /> : <FaSearch />}
                    </li>
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

                    {user?.profileImg ?
                        <li className='rounded-[50%] overflow-hidden border-2 border-main'>
                            <Link
                                to={user.email}
                                className={`block whitespace-nowrap text-2xl w-8`}
                            >
                                <img src={user.profileImg} alt="" />
                            </Link>
                        </li> :
                        <li >
                            <Link
                                to={'/sign-in'}
                                className={`block rounded-lg p-2 whitespace-nowrap text-2xl transition-colors`}
                            >
                                <HiUser />
                            </Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    )
}
