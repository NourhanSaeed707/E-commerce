import { ContentType } from '@/types/content';
import React from 'react'

function MainContent({image, titleButton, title }: ContentType) {
    
  return (
    <div>
        <div
    className="relative h-[350px] overflow-hidden  bg-cover bg-[50%] bg-no-repeat"
    style={{ backgroundImage: `url(${image})`, backgroundPosition: 'center', }} 
    >
        
        <div
            className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
            <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
                <h1 className="mb-6 text-5xl font-bold">{title && title}</h1>
                <h3 className="mb-8 text-3xl font-bold">Subeading</h3>
                <button
                type="button"
                className="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-300 hover:text-neutral-200 focus:border-neutral-300 focus:text-neutral-200 focus:outline-none focus:ring-0 active:border-neutral-300 active:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600"
                data-twe-ripple-init
                data-twe-ripple-color="light">
                {titleButton} 
                </button>
            </div>
            </div>
        </div>
        </div> 
    </div>
  )
}

export default MainContent;