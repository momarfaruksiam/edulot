import { IoIosArrowDown } from "react-icons/io"
import UploadPost from './UploadPost';


export default function ProfilePost({ resUser }) {
    return (
        <section className='m-4 my-10 p-4 max-w-150 bg-card border-2 border-border rounded-lg shadow-sm'>
            <div className='flex flex-wrap justify-between items-center'>
                <div className='flex gap-3 items-center font-semibold'>
                    <img
                        className='overflow-hidden rounded-full h-10 w-10 object-cover'
                        src={resUser?.profileImg || 'https://via.placeholder.com/150'}
                        alt={resUser?.name || 'User'}
                    />
                    <h2>{resUser?.name}</h2>
                </div>
                <div className='w-full flex gap-2'>
                    <button
                        type="button"
                        className='ml-auto p-1 px-3 border-2 border-border rounded-lg font-semibold text-subtext flex gap-2 items-center text-sm hover:bg-border/50 transition'
                    >
                        <span>Post</span>
                        <IoIosArrowDown />
                    </button>
                    <button
                        type="button"
                        className='p-1 px-3 border-2 border-border rounded-lg font-semibold text-subtext flex gap-2 items-center text-sm hover:bg-border/50 transition'
                    >
                        <span>Public</span>
                        <IoIosArrowDown />
                    </button>
                </div>
            </div>

            <UploadPost transperency={'public'} resUser={resUser} />
        </section>
    )
}