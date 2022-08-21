import React from 'react'
import { format } from 'timeago.js';


function Events({ events }) {
  return (
    <>
        {
            events?.map((ev, idx) => (
                <div key={idx} className="flex gap-x-4 items-center bg-gray-900 p-5 rounded-lg">
                    <img src={ev.actor?.avatar_url} className="w-16 rounded-full" alt="" />
                    <div className='flex flex-col justify-between ml-6 break-words'>
                        <h1 className='text-teal-500 break-words'>{ev?.actor?.login} {ev?.type}</h1>
                        <h1 className='break-words'>{ev?.repo?.name}</h1>
                        <h1 className="text-sm break-words">{format(ev?.created_at)}</h1>
                    </div>
                </div>
            ))
        }
    </>
  )
}

export default Events;