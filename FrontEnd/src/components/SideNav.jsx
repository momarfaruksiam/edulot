import React, { useState } from 'react'
import { RiMenu2Fill } from 'react-icons/ri'

export default function SideNav({ openMenu }) {
    return (
        <div
            className={`bg-bg overflow-hidden z-8 flex flex-col gap-2
                max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-80px)]
            ${openMenu ? 'max-w-60 p-2' : 'max-w-0 p-0 md:max-w-20 md:p-2'} 
            `}>
            <div className='mt-10 overflow-y-auto overflow-x-hidden flex-1'>
                <ul>
                    <li>home is home for us</li>
                </ul>
            </div>
        </div>
    )
}
