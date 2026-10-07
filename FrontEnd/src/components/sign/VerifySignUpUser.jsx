import React, { useState } from 'react'
import { useNavigate } from 'react-router';

import { LuRepeat2 } from "react-icons/lu";


import Input from '../../utils/Input'
import Button from '../../utils/Button'
import { toast } from 'react-toastify';
import axios from 'axios';
import serverName from '../../utils/serverName';

export default function VerifySignUpUser({ email }) {
    const [loading, isLoading] = useState(false)
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email,
        code: ''
    })
    const [formDataError, setFormDataError] = useState({
        code: ''
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
    const handleVerifyCodeSent = async (e) => {
        e.preventDefault()
        isLoading(true)
        if (!formData.code) {
            setFormDataError({
                code: formData.code ? '' : 'Please enter the code',
            })
            return
        }

        try {
            const response = await axios.post(serverName + '/registration/verify', formData)
            console.log(response.data)
            if (!response.data.success) {
                toast.success('Code is not correct')
                setFormData({
                    email,
                    code: ''
                })
            }
            else {
                toast.success('User verified now!')
                navigate('/sign-in')
            }

        } catch (error) {
            toast.warning(error.response?.data?.message || error.message)
            console.log(error)
        }
        isLoading(false)
    }

    if (loading)
        return <>Loading</>

    return (
        <section className='p-4 bg-card rounded-md space-y-4 max-w-110 w-full shadow border border-border'>
            <h1 className='font-bold text-2xl'>Verify yourself</h1>
            <form
                onSubmit={handleVerifyCodeSent}
                className='flex flex-col gap-2 '>
                <h2>{email}</h2>
                <Input
                    type={'text'}
                    name={'code'}
                    placeholder={'Enter code'}
                    onChange={handleFormDataChange}
                    value={formData.code}
                    errorMessage={formDataError.code}
                />
                <div
                    className='text-xs text-warning font-semibold flex items-center gap-1 py-2'
                >
                    <LuRepeat2 />
                    <span>Resend the code</span>
                </div>
                <Button
                    label={'Verify'}
                    type={'submit'}
                    className={'bg-main font-semibold text-bg'}
                />
            </form>
        </section>
    )
}
