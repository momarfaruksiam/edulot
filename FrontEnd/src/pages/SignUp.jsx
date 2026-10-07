import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import Input from '../utils/Input'
import Button from '../utils/Button'

export default function SignIn() {
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

    const handleSubmitForm = (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            setFormDataError({
                email: formData.email ? '' : 'Please fill email field',
                password: formData.password ? '' : 'Please fill password field'
            })
            return
        }

        toast.success(formData.email)

        setFormData({
            email: '',
            password: ''
        })
    }


    return (
        <main className='h-full flex items-center justify-center'>
            <section className='p-4 bg-card rounded-md space-y-4 max-w-110 w-full shadow border border-border'>
                <h1 className='font-bold text-2xl'>Sign up</h1>
                <form
                    onSubmit={handleSubmitForm}
                    className='flex flex-col gap-2 '>
                    <Input
                        type={'text'}
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
                            to={'/sign-in'}
                            className='text-sm p-1 text-highlight'>
                            I have an account.
                        </Link>
                    </div>
                    <Button
                        type={'submit'}
                        label={"Sign up"}
                        className={'font-semibold bg-main text-bg'}
                    />
                </form>
            </section>
        </main>
    )
}
