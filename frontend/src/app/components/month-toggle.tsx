'use client'

import { useState } from 'react'
import Link from 'next/link'

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const MonthSelector: React.FC = () => {
  const [monthIndex, setMonthIndex] = useState<number>(0) // Start at the first month

  // Handle the next month toggle
  const handleNext = (): void => {
    setMonthIndex((prevIndex) => (prevIndex + 1) % months.length)
  }

  // Handle the previous month toggle
  const handlePrev = (): void => {
    setMonthIndex((prevIndex) =>
      prevIndex === 0 ? months.length - 1 : prevIndex - 1
    )
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center space-x-4">
        {/* Toggle Left Button */}
        <button
          onClick={handlePrev}
          className="bg-gray-300 p-2 rounded"
          aria-label="Previous Month"
        >
          &#9664; {/* Left Arrow */}
        </button>

        {/* Display selected month */}
        <div className="text-[100px] font-bold">{months[monthIndex]}</div>

        {/* Toggle Right Button */}
        <button
          onClick={handleNext}
          className="bg-gray-300 p-2 rounded"
          aria-label="Next Month"
        >
          &#9654; {/* Right Arrow */}
        </button>
      </div>

      {/* Submit Button */}

      <Link href={`/${months[monthIndex].toLowerCase()}`}>
        <button className="bg-blue-500 text-white px-8 py-4 rounded m-10">
          Take the train
        </button>
      </Link>
    </div>
  )
}

export default MonthSelector
