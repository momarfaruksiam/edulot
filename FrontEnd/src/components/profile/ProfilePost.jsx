import { IoIosArrowDown } from "react-icons/io"
import UploadPost from './UploadPost';


export default function ProfilePost({ resUser }) {
    return (
        <section className='m-4 my-10 p-4 max-w-150 bg-card border-2 border-border rounded-lg shadow-sm'>
            <div className='flex flex-wrap justify-between items-center'>
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