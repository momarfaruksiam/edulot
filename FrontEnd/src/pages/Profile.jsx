import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useUser } from '../contexts/userContext'
import ProfileHeader from '../components/profile/ProfileHeader'

export default function Profile() {
    const { user } = useUser()
    const { usernamePeram } = useParams()

    if (!usernamePeram.startsWith('@'))
        return <>Somthing is wrong</>

    const cleanUsername = usernamePeram.slice(1)

    const [resUser, setResUser] = useState(user)

    useEffect(() => {
        if (user?.username === cleanUsername) {
            setResUser(user)
        }
    }, [user, cleanUsername])

    if (resUser)
        return (
            <main className="container mx-auto">
                <ProfileHeader resUser={resUser} />
                <section className='mt-10 md:m-4'>
                    <ul className='flex gap-4 overflow-x-auto'>
                        <li className='font-bold text-sm md:text-[16px] text-subtext'> Home</li>
                        <li className='font-bold text-sm md:text-[16px] text-subtext'> Home</li>
                    </ul>
                </section>
            </main>
        )
}