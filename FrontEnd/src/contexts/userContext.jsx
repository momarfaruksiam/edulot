import axios from 'axios'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import serverName from '../utils/serverName'

const userContext = createContext()

export function UserProvider({ children }) {
    const [user, setUser] = useState(null)

    const getUser = async () => {
        try {
            const response = await axios.get(serverName + '/auth-user', {
                withCredentials: true
            })

            if (response.data.success) {
                setUser(response.data.user)
            }
        } catch (error) {
            console.log(error)
            setUser(null)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <userContext.Provider value={{ user, getUser }}>
            {children}
        </userContext.Provider>
    )
}

export function useUser() {
    return useContext(userContext)
}