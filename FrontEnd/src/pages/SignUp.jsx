import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Input from '../utils/Input'
import Button from '../utils/Button'
import serverName from '../utils/serverName'
import VerifySignUpUser from '../components/sign/VerifySignUpUser'

export default function SignUp() {
    const [loading, setLoading] = useState(false)

    const [verifyUserWithCode, setVerifyUserCode] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [formDataError, setFormDataError] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
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

        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            setFormDataError({
                name: formData.name ? '' : 'Please fill name field',
                email: formData.email ? '' : 'Please fill email field',
                password: formData.password ? '' : 'Please fill password field',
                confirmPassword: formData.confirmPassword ? '' : 'Please fill confirm password field',
            })
            return
        }

        if (formData.password !== formData.confirmPassword) {
            setFormDataError(prev => ({
                ...prev,
                confirmPassword: 'Password did not matched'
            }))
            return
        }


        await handleSubmission()
    }


    const handleSubmission = async () => {
        setLoading(true)
        try {
            const response = await axios.post(serverName + '/registration', formData)
            console.log(response.data)
            toast.success('Verification code sent!')

            setVerifyUserCode(true)
        } catch (error) {
            toast.warning(error.response?.data?.message || error.message)
            if (error.response.status === 409)
                setFormDataError(prev => ({
                    ...prev,
                    email: 'This email exists'
                }))
            console.log(error)
            setVerifyUserCode(false)
        }
        setLoading(false)
    }

    if (loading)
        return <>Loading</>


    return (
        <main className='h-full flex items-center justify-center'>
            {!verifyUserWithCode ?
                <section className='p-4 bg-card rounded-md space-y-4 max-w-110 w-full shadow border border-border'>
                    <h1 className='font-bold text-2xl'>Sign up</h1>
                    <form
                        onSubmit={handleSubmitForm}
                        className='flex flex-col gap-2 '>
                        <Input
                            type={'text'}
                            name={'name'}
                            placeholder={'Full name'}
                            onChange={handleFormDataChange}
                            value={formData.name}
                            errorMessage={formDataError.name}
                        />
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
                        <Input
                            type={'password'}
                            name={'confirmPassword'}
                            placeholder={'Confirm password'}
                            onChange={handleFormDataChange}
                            value={formData.confirmPassword}
                            errorMessage={formDataError.confirmPassword}
                        />
                        <div className='flex flex-col gap-2 p-1'>
                            <Link
                                to={'/sign-in'}
                                className='text-sm p-1 text-highlight hover:underline'>
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
                :
                <VerifySignUpUser setVerifyUserCode={setVerifyUserCode} email={formData.email} />}
        </main>
    )
}
