import React from 'react'
import { useUser } from '../contexts/userContext'

export default function Home() {
    const { user } = useUser()
    return (
        <>
            {user?.name}
            {user?.email}
            {user?.password}
            {user?.profileImg}
        </>
    )
}
