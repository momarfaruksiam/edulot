import React, { useRef, useState } from 'react'
import { FaImages, FaPoll, FaVideo } from "react-icons/fa"
import { toast } from 'react-toastify'
import axios from 'axios'


import cloudServerName from '../../utils/cloudServerName'

export default function UploadPost({ resUser }) {
    const textareaRef = useRef(null)

    const imageRef = useRef(null)
    const videoRef = useRef(null)

    const formData = new FormData()

    const [fileInfo, setFileInfo] = useState('')

    const handleInput = (e) => {
        const textarea = textareaRef.current
        if (!textarea) return

        textarea.style.height = 'auto'

        textarea.style.height = `${textarea.scrollHeight}px`
    }

    const [changeDateType, setChangeDateType] = useState(false)
    const [changeTimeType, setChangeTimeType] = useState(false)

    const [time, setTime] = useState({
        date: '',
        time: ''
    })


    const handleImgUpload = async (e) => {
        const file = e.target.files?.[0]

        if (!file) return

        const image = file.type.startsWith('image/')
        const video = file.type.startsWith('video/')


        if (!image && !video) {
            e.target.value = ''
            toast.error('Please select video or image!')
            return
        }

        formData.append('media', file)

        setFileInfo({
            file,
            url: URL.createObjectURL(file),
            type: image ? 'image' : video ? 'video' : 'Error',
            loading: false
        })

        try {
            const response = await axios.post(cloudServerName + '/upload-media', formData, {
                withCredentials: true
            })

            toast.success(response.data.message)
        } catch (error) {
            toast.error(error?.response?.message)
            console.log(error)
        }
    }

    const handlePost = (e) => {
        e.preventDefault()
        toast.success('clicked')
    }

    return (
        <form
            onSubmit={handlePost}
            className='pt-4 w-full flex flex-col items-center gap-4'>
            <textarea
                ref={textareaRef}
                onInput={handleInput}
                rows={1}
                placeholder={`Write the title`}
                className='w-full bg-transparent resize-none overflow-y-auto max-h-48 outline-none text-text font-semibold placeholder:text-subtext'
            />
            <textarea
                ref={textareaRef}
                onInput={handleInput}
                rows={1}
                placeholder={`Description`}
                className='w-full bg-transparent resize-none overflow-y-auto max-h-48 outline-none text-text placeholder:text-subtext'
            />
            {fileInfo && (
                <div className="my-4 w-full overflow-hidden">
                    <div className="w-full max-h-100 flex justify-center">
                        {fileInfo.loading ? (
                            'Loading...'
                        ) : fileInfo.type === 'image' ? (
                            <img
                                src={fileInfo.url}
                                alt="Post preview"
                                className="w-full h-auto max-h-100 object-contain"
                            />
                        ) : (
                            <video
                                src={fileInfo.url}
                                controls
                                className="w-full h-auto max-h-100 object-contain"
                            />
                        )}
                    </div>
                </div>
            )}
            <div className='w-full'>
                <input
                    type="file"
                    accept="image/*"
                    ref={imageRef}
                    hidden
                    onChange={handleImgUpload}
                />

                <input
                    type="file"
                    accept="video/*"
                    ref={videoRef}
                    hidden
                    onChange={handleImgUpload}
                />
                <ul className='flex items-center flex-wrap gap-2'>
                    <li
                        onClick={() => imageRef.current.click()}
                        className='flex gap-2 p-1 px-2 rounded-lg items-center font-semibold border-2 border-border text-text/80'>
                        <FaImages />
                        <span>Image</span>
                    </li>
                    <li
                        onClick={() => videoRef.current.click()}
                        className='flex gap-2 p-1 px-2 rounded-lg items-center font-semibold border-2 border-border text-text/80'>
                        <FaVideo />
                        <span>Video</span>
                    </li>
                    <li className='flex gap-2 p-1 px-2 rounded-lg items-center font-semibold border-2 border-border text-text/80'>
                        <FaPoll />
                        <span>Poll</span>
                    </li>
                </ul>
            </div>
            <div className='w-full pt-2 flex flex-col gap-2'>
                <h3 className='text-sm font-semibold text-subtext'>Choose time to schedule this post</h3>
                <div className='flex gap-3 items-center flex-wrap'>
                    <input
                        onFocus={() => setChangeDateType(true)}
                        onBlur={() => {
                            if (!time.date)
                                setChangeDateType(false)
                        }}
                        type={changeDateType ? "date" : 'text'}
                        placeholder='Date'
                        onChange={(e) => setTime({ ...time, date: e.target.value })}
                        value={time.date}
                        className='p-2 border-2 border-border rounded-lg bg-transparent font-semibold text-text outline-none'
                    />
                    <input
                        onFocus={() => setChangeTimeType(true)}
                        onBlur={() => {
                            if (!time.time)
                                setChangeTimeType(false)
                        }}
                        type={changeTimeType ? "time" : 'text'}
                        placeholder='Time'
                        onChange={(e) => setTime({ ...time, time: e.target.value })}
                        value={time.time}
                        className='p-2 border-2 border-border rounded-lg bg-transparent font-semibold text-text outline-none'
                    />
                    <button
                        type='button'
                        className='border-2 border-main/50 rounded-lg font-semibold text-xs text-main p-2'>Show preview</button>
                </div>
            </div>
            <div className='ml-auto flex font-semibold items-center gap-2 text-text/80'>
                <button
                    type='button'
                    className='bg-subtext/50 hover:bg-subtext hover:text-bg p-1 px-4 border-2 border-border rounded-lg'>Cancle</button>
                <button
                    type='submit'
                    className='bg-info/50 hover:bg-info hover:text-bg p-1 px-4 border-2 border-border rounded-lg'>Post</button>
            </div>
        </form>
    )
}
