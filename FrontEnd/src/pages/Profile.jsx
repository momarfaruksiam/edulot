import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../contexts/userContext'

import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileBody from '../components/profile/ProfileBody'
import ProfilePost from '../components/profile/ProfilePost'

export default function Profile() {
    const { user } = useUser()
    const { usernamePeram } = useParams()

    const cleanUsername = usernamePeram ? usernamePeram.slice(1) : ''

    const [resUser, setResUser] = useState(null)

    useEffect(() => {
        if (user?.username === cleanUsername) {
            setResUser(user)
        }
    }, [user, cleanUsername])

    if (!usernamePeram || !usernamePeram.startsWith('@')) {
        return <>Something is wrong</>
    }

    if (resUser) {
        return (
            <main className="container mx-auto">
                <ProfileHeader resUser={resUser} />
                <ProfilePost resUser={resUser} />
                <ProfileBody resUser={resUser} />
            </main>
        )
    }

    return null
}