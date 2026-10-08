import React from 'react'
import { useUser } from '../contexts/userContext'

export default function Home() {
    const { user } = useUser()
    return (
        <div>
            <div className='line-clamp-1'>
                {user?.name}
                {user?.email}
                {user?.password}
            </div>
            <img src={user?.profileImg} alt="" />
        </div>
    )
}
