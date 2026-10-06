import React from 'react'

export default function Search() {
    return (
        <div className='flex items-center'>
            <input
                type="text"
                placeholder='Search'
                className='border-2 border-border rounded-l-md px-4 py-2 focus:outline-none w-full'
            />
            <button
                className='bg-main text-bg font-medium px-4 py-2 rounded-r-md border-2 border-main'
            >
                Search
            </button>
        </div>
    )
}
