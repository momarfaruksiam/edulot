import React from 'react'

export default function Input({ onClick, onChange, value, name, placeholder, type, className, errorMessage }) {
    return (
        <div className='flex flex-col'>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onClick={onClick}
                onChange={onChange}
                className={`
                    ${className} ${errorMessage && 'border-warning p-3'} 
                    border-2 border-main/50 rounded p-2 text-lg outline-0 focus:border-main
                 `} />
            <span className='text-sm font-semibold text-danger ml-2'>{errorMessage}</span>
        </div>
    )
}
