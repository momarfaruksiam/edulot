import React, { useState } from 'react'
import Search from './Search'
import { FaBell, FaFacebookMessenger, FaSearch, FaUser } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { RiMenu2Fill } from "react-icons/ri";


export default function Nav({ setOpenMenu, openMenu }) {
    const [openSearch, setOpenSearch] = useState(false)
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
                    className='flex items-center text-xl gap-4 font-medium text-subtext
                order-2 
                md:order-3'>
                    <li
                        className='md:hidden'
                        onClick={() => setOpenSearch(!openSearch)}>
                        {openSearch ? <RxCross1 /> : <FaSearch />}
                    </li>
                    <li><FaBell /></li>
                    <li><FaFacebookMessenger /></li>
                    <li><FaUser /></li>
                </ul>

            </nav>
        </header>
    )
}
