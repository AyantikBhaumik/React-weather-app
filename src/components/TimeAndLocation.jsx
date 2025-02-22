import React from 'react'
import { formatToLocalTime } from '../services/weatherService'

function TimeAndLocation({weather:{name, country}}) {
  return (
    <div>
      
      <div className='flex items-center justify-center my-3'>
        <p className='text-white text-3xl font-medium'>
            {`${name}, ${country}`}
        </p>
      </div>
    </div>
  )
}

export default TimeAndLocation
