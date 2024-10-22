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
      <div className="flex items-center gap-4">
        {/* Toggle Left Button */}
        <button
          onClick={handlePrev}
          className="p-2 m-4"
          aria-label="Previous Month"
        >
          <img src="img/rat-point.svg" alt="" />
        </button>

        <div className="p-4 m-auto bg-[#73A29E] inline-block">
          <div className="px-6 py-3 bg-[#1A2D70] inline-block">
            {/* Display selected month */}
            <div className="text-[100px] font-mono text-white leading-tight uppercase tracking-tight">
              {months[monthIndex]}
            </div>
          </div>
        </div>

        {/* Toggle Right Button */}
        <button
          onClick={handleNext}
          className="p-2 m-4"
          aria-label="Next Month"
        >
          <img
            src="img/rat-point.svg"
            className="transform scale-x-[-1]"
            alt=""
          />
        </button>
      </div>

      {/* Submit Button */}

      <Link href={`/${months[monthIndex].toLowerCase()}`}>
        <button className="px-8 py-4 m-10 flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:translate-y-[-8px]">
          <p className="font-mono uppercase mb-4">
            Click the metrocard to see the results!
          </p>

          <img
            src="/img/metrocard.png"
            className="transform transition-transform duration-300 ease-in-out hover:shadow-[0_4px_100px_#FFC801]"
            alt=""
          />
        </button>
      </Link>
    </div>
  )
}

export default MonthSelector
