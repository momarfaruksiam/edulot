import React, { useState } from 'react'
import BodyPost from './BodyPost'

export default function ProfileBody({ resUser }) {

    const [profileBody, setProfileBody] = useState([
        {
            title: 'Home',
            component: <>Home Content</>,
            isactive: true,
        },
        {
            title: 'Posts',
            component: <BodyPost resUser={resUser} />,
            isactive: false,
        },
        {
            title: 'Courses',
            component: <>Courses Content</>,
            isactive: false,
        },
        {
            title: 'Highlights',
            component: <>Highlights Content</>,
            isactive: false,
        },
        {
            title: 'Shorts',
            component: <>Shorts Content</>,
            isactive: false,
        },
    ])

    const activeItem = profileBody.find((item) => item.isactive)

    const handleTabClick = (indexToActivate) => {
        setProfileBody((prevBody) =>
            prevBody.map((item, index) => ({
                ...item,
                isactive: index === indexToActivate,
            }))
        )
    }

    return (
        <section className="m-4">
            <ul className="flex gap-4 overflow-x-auto cursor-pointer">
                {profileBody.map((item, index) => (
                    <li
                        key={index}
                        onClick={() => handleTabClick(index)}
                        className={`font-bold text-sm md:text-[16px] text-subtext pb-1 ${item.isactive && 'border-b-2 border-primary'}`}
                    >
                        {item.title}
                    </li>
                ))}
            </ul>
            <div className="mt-8 bg-card">
                {activeItem?.component}
            </div>
        </section>
    )
}
