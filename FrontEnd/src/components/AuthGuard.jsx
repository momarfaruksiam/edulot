import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUser } from '../contexts/userContext'

export default function AuthGuard({ authComponent, unauthComponent }) {
    const { user, loading } = useUser()

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>
    }

    if (user) {
        return authComponent ? authComponent : <Navigate to="/" replace />
    }

    return unauthComponent ? unauthComponent : <Navigate to="/sign-in" replace />
}