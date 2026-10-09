import React from 'react'

export default function ProfileHeader({ resUser }) {
    return (
        <section className='space-y-4'>
            <div className="max-h-40 md:max-h-60 overflow-hidden rounded-lg shadow flex items-center">
                <img
                    src={resUser.coverImg}
                    alt={`${resUser.username}'s cover`}
                    className="h-full w-full object-cover"
                />
            </div>
            <div className='flex items-center md:items-start justify-center md:justify-start gap-2 md:gap-4 mx-auto'>
                <div>
                    <div
                        className='overflow-hidden flex items-center h-30 md:h-50 w-30 md:w-50 rounded-[50%] bg-main p-1'>
                        <img
                            src={resUser.profileImg}
                            alt=""
                            className="h-full w-full object-cover border-2 border-bg rounded-[50%]"
                        />
                    </div>
                </div>
                <div className='space-y-1 md:space-y-2 text-center md:text-start'>
                    <div>
                        <h1 className='text-lg md:text-2xl font-bold'>{resUser.name}</h1>
                        <h2 className='font-semibold text-main text-sm'>@{resUser.username}</h2>
                    </div>
                    <div className='flex justify-center md:justify-start gap-2 flex-wrap font-semibold text-xs md:text-sm'>
                        <span>20k connections</span>
                        <span>20k following</span>
                    </div>
                    <div className='flex justify-center md:justify-start gap-2 flex-wrap font-semibold text-xs md:text-sm'>
                        <span>105 videos</span>
                        <span>105 videos</span>
                    </div>
                    <div className='line-clamp-2 md:line-clamp-3 text-xs md:text-sm font-medium text-subtext'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nam, magni.
                    </div>
                </div>
            </div>
            {/* this div will be changed */}
            <div className='flex items-center gap-2 flex-1 md:max-w-100 md:ml-auto'>
                <button className='border rounded-2xl p-2 w-full font-bold text-main bg-card block'>Dashboard</button>
                <button className='border rounded-2xl p-2 w-full min-w-20 font-bold text-bg bg-main block'>Edit</button>
            </div>
        </section>
    )
}
