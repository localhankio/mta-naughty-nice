'use client'

import { useEffect, useState } from 'react'
import MonthToggle from './components/month-toggle'

export default function Main() {
  const imageUrl = '/img/tile-grid.png' // or a URL from props/state
  // const subwayBgUrl = '/img/bg-rail.svg' // or a URL from props/state

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
            className="bottom-[4vw] z-100"
            style={{
              position: 'absolute',
              left: `${translateX}vw`, // Move image from right to left
              transition: 'right 0.1s ease-out', // Smooth transition
            }}
          />

          <div className="flex flex-col pl-[48vw] pt-[6vw] absolute top-[5px]">
            <h1 className="text-[3vw] font-bold my-4 tracking-tight">
              We&#39;re making a list.
            </h1>
            <img src="/img/sign1.jpg" className="w-[32vw]"></img>
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
            className="bottom-[4vw] z-100 transform scale-x-[-1]"
            style={{
              position: 'absolute',
              right: `${translateX + 40}vw`, // Move image from right to left
              transition: 'right 0.1s ease-out', // Smooth transition
            }}
          />
          <img
            src="/img/rat.svg"
            className="bottom-[4vw] z-100 transform scale-x-[-1]"
            style={{
              position: 'absolute',
              right: `${translateX + 50}vw`, // Move image from right to left
              transition: 'right 0.1s ease-out', // Smooth transition
            }}
          />

          <div className="flex flex-col pl-[10vw] pt-[5vw] absolute top-[5px]">
            <h1 className="text-[3vw] font-bold my-4 tracking-tight">
              We&#39;re checking it twice.
            </h1>
            <img src="/img/sign2.png" className="w-[40vw]"></img>
          </div>
          <img
            src="/img/stairwell-section.svg"
            alt="stairwell"
            className="w-full object-cover z-50 relative transform scale-x-[-1] "
          />

          {/* </div> */}
        </section>

        <section className="bg-neutral-900 relative p-20 overflow-hidden">
          <h1 className="text-[3vw] font-bold text-white m-auto text-center tracking-tight relative mb-10 z-20">
            We&#39;ve finally found out which lines are:
          </h1>

          <div className="relative">
            <div className="flex justify-center gap-4 z-20">
              <div className="flex flex-col items-center">
                <img src="/img/naughty.svg" alt="" className="z-20 m-4" />
                <br></br>
                <div className="transform transition-transform duration-300 ease-in-out hover:shadow-[0_4px_100px_#E70000] hover:translate-y-[-8px] rounded-full">
                  <img
                    src="/img/naughty-train.svg"
                    alt=""
                    className="max-w-[30vw] z-0"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <img src="/img/or.svg" alt="" className="z-20 m-4" />
                <br></br>
                <img
                  src="/img/platform.svg"
                  alt=""
                  className="z-10 w-[30vw] pt-[5vw]"
                />
              </div>
              <div className="flex flex-col items-center">
                <img src="/img/nice.svg" alt="" className="z-20 m-4" />
                <br></br>
                <div className="transform transition-transform duration-300 ease-in-out hover:shadow-[0_4px_100px_#11760E] hover:translate-y-[-8px] rounded-full">
                  <img
                    src="/img/nice-train.svg"
                    alt=""
                    className="max-w-[30vw] z-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="scroll-section overflow-hidden relative bg-repeat bg-[size:160px] bg-opacity-50"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <h1 className="text-[3vw] font-bold m-auto text-center tracking-tight leading-tight relative py-12 z-10">
            It&#39;s tiiiiiiime..... <br></br>See the naughty and nice lines for
            the month of:
          </h1>
          <MonthToggle />
          <img
            src="/img/swipe-station.svg"
            className="relative w-full bottom-0"
            alt=""
          />
        </section>
      </main>
    </div>
  )
}
