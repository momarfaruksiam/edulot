import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../utils/Input'
import Button from '../utils/Button'
import axios from 'axios'
import serverName from '../utils/serverName'

export default function SignIn() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [formDataError, setFormDataError] = useState({
        email: '',
        password: ''
    })

    const handleFormDataChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))

        setFormDataError(prev => ({
            ...prev,
            [e.target.name]: e.target.value ? '' : `Please fill ${e.target.name} field`
        }))
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setFormDataError({
                email: formData.email ? '' : 'Please fill email field',
                password: formData.password ? '' : 'Please fill password field'
            })
            return
        }

        await handleSubmission()
    }

    const handleSubmission = async () => {
        setLoading(true)
        try {
            const response = await axios.post(serverName + '/sign-in', formData, {
                withCredentials: true
            })
            console.log(response.data)
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            toast.warning(error.response?.data?.message || error.message)
            if (error.response.status === 409)
                setFormDataError(prev => ({
                    ...prev,
                    email: 'This email exists'
                }))
            console.log(error)
        }
        setLoading(false)
    }

    if (loading)
        return <>Loading</>

    return (
        <main className='h-full flex items-center justify-center'>
            <section className='p-4 bg-card rounded-md space-y-4 max-w-110 w-full shadow border border-border'>
                <h1 className='font-bold text-2xl'>Sign in</h1>
                <form
                    onSubmit={handleSubmitForm}
                    className='flex flex-col gap-2 '>
                    <Input
                        type={'email'}
                        name={'email'}
                        placeholder={'Email'}
                        onChange={handleFormDataChange}
                        value={formData.email}
                        errorMessage={formDataError.email}
                    />
                    <Input
                        type={'password'}
                        name={'password'}
                        placeholder={'Password'}
                        onChange={handleFormDataChange}
                        value={formData.password}
                        errorMessage={formDataError.password}
                    />
                    <div className='flex flex-col gap-2 p-1'>
                        <Link
                            to={'/forget-password'}
                            className='text-sm p-1 text-main hover:underline'>Forget password?</Link>
                        <Link
                            to={'/sign-up'}
                            className='text-sm p-1 text-highlight hover:underline'>
                            or Don't have any account?
                        </Link>
                    </div>
                    <Button
                        type={'submit'}
                        label={"Sign in"}
                        className={'font-semibold bg-main text-bg'}
                    />
                </form>
            </section>
        </main>
    )
}
