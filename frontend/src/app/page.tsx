'use client'

import { useEffect, useState } from 'react'
import MonthToggle from './components/month-toggle'

export default function Main() {
  const imageUrl = '/img/tile-grid.png' // or a URL from props/state

  const [translateX, setTranslateX] = useState(100) // Start from right

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY // Current scroll position
      // Calculate the new translateX value based on scroll position
      const newTranslateX = 100 - scrollPosition / 10 // Adjust this factor for speed
      setTranslateX(newTranslateX)
    }

    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div>
      <main>
        <section
          className="scroll-section overflow-hidden relative bg-repeat bg-[size:160px] bg-opacity-50"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <img
            src="/img/rat.svg"
            className="bottom-14 z-100"
            style={{
              position: 'absolute',
              left: `${translateX}vw`, // Move image from right to left
              transition: 'right 0.1s ease-out', // Smooth transition
            }}
          />

          <div className="flex flex-col pl-[50vw] pt-[8vw] absolute top-[5px]">
            <h1 className="text-4xl font-bold my-8 tracking-tight">
              We&#39;re making a list.
            </h1>
            <img src="/img/sign1.jpg" className="w-[500px]"></img>
          </div>

          <img
            src="/img/stairwell-section.svg"
            alt="stairwell"
            className="w-full object-cover z-50 relative"
          />
        </section>

        <section
          className="scroll-section overflow-hidden relative bg-repeat bg-[size:160px] bg-opacity-50"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <img
            src="/img/rat.svg"
            className="bottom-14 z-100 transform scale-x-[-1]"
            style={{
              position: 'absolute',
              right: `${translateX + 40}vw`, // Move image from right to left
              transition: 'right 0.1s ease-out', // Smooth transition
            }}
          />
          <img
            src="/img/rat.svg"
            className="bottom-14 z-100 transform scale-x-[-1]"
            style={{
              position: 'absolute',
              right: `${translateX + 50}vw`, // Move image from right to left
              transition: 'right 0.1s ease-out', // Smooth transition
            }}
          />

          <div className="flex flex-col pl-[10vw] pt-[8vw] absolute top-[20px]">
            <h1 className="text-4xl font-bold my-8 tracking-tight">
              We&#39;re checking it twice.
            </h1>
            <img src="/img/sign2.png" className="w-[500px]"></img>
          </div>
          <img
            src="/img/stairwell-section.svg"
            alt="stairwell"
            className="w-full object-cover z-50 relative transform scale-x-[-1] "
          />

          {/* </div> */}
        </section>

        <section className="bg-neutral-900 h-[106vh] relative overflow-hidden">
          <h1 className="text-4xl font-bold text-white m-auto text-center tracking-tight relative py-20 z-20">
            We&#39;ve finally found out which lines are:
          </h1>

          <div className="relative">
            <div className="flex justify-center -space-x-8 z-20">
              <div className="flex flex-col items-center ">
                <img src="/img/naughty.svg" alt="" className="z-20" />
                <br></br>
                <img src="/img/naughty-train.svg" alt="" className="z-0" />
              </div>
              <div className="flex flex-col items-center">
                <img src="/img/or.svg" alt="" className="z-20" />
                <br></br>
                <img
                  src="/img/platform.svg"
                  alt=""
                  className="z-10 w-[300px] pt-[200px]"
                />
              </div>
              <div className="flex flex-col items-center">
                <img src="/img/nice.svg" alt="" className="z-20" />
                <br></br>
                <img src="/img/nice-train.svg" alt="" className="z-0" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="scroll-section overflow-hidden relative bg-repeat bg-[size:160px] bg-opacity-50 py-12"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <h1 className="text-4xl font-bold m-auto text-center tracking-tight relative py-12 z-10">
            It&#39;s tiiiiiiime..... <br></br>See the naughty and nice lines for
            the month of:
          </h1>
          <MonthToggle />
        </section>
      </main>
    </div>
  )
}
