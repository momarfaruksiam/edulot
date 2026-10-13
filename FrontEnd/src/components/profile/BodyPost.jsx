import React from 'react'

export default function BodyPost({ resUser }) {
    return (
        <div>
            <video
                controls
                src={'http://localhost:5001/api/v1/get-file?u=6ac8b06b7d4a8ac8f6042982&fo=videos&fi=1791832360774-video1.mp4'} alt="" />
        </div>
    )
}
