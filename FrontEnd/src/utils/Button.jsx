import React from 'react'

export default function Input({ onClick, onChange, type, label, className, errorMessage }) {
    return (
        <div className='flex flex-col'>
            <button
                type={type}
                onClick={onClick}
                onChange={onChange}
                className={`
                    ${className} ${errorMessage && 'border-warning p-3'} 
                    border-2 border-main/50 rounded p-2 text-lg outline-0 focus:border-main
                 `} >
                {label}
            </button>
            <span className='capitalize text-xs font-semibold text-danger ml-2'>{errorMessage}</span>
        </div>
    )
}
