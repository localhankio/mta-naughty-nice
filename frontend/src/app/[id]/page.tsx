'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import TextBlock from '../components/text-block'
import Link from 'next/link'

type MtaData = {
  month: string
  naughty_line: string
  nice_line: string
  naughty_busyness_rank: string
  naughty_busyness_note: string
  naughty_ontime_rank: string
  naughty_ontime_note: string
  naughty_reliability_rank: string
  naughty_reliability_note: string
  nice_busyness_rank: string
  nice_busyness_note: string
  nice_ontime_rank: string
  nice_ontime_note: string
  nice_reliability_rank: string
  nice_reliability_note: string
}

type SubwayLineKeys =
  | 'A'
  | 'B'
  | 'C'
  | 'D'
  | 'E'
  | 'F'
  | 'G'
  | 'J'
  | 'L'
  | 'M'
  | 'N'
  | 'Q'
  | 'R'
  | 'W'
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'

const subway_lines: Record<SubwayLineKeys, string> = {
  A: '#0039a6',
  B: '#ff6319',
  C: '#0039a6',
  D: '#ff6319',
  E: '#0039a6',
  F: '#ff6319',
  G: '#6cbe45',
  J: '#996633',
  L: '#a7a9ac',
  M: '#ff6319',
  N: '#fccc0a',
  Q: '#fccc0a',
  R: '#fccc0a',
  W: '#fccc0a',
  1: '#ee352e',
  2: '#ee352e',
  3: '#ee352e',
  4: '#00933c',
  5: '#00933c',
  6: '#00933c',
  7: '#b933ad',
}

export default function MonthPage() {
  const subwayBgUrl = '/img/bg-rail.svg' // or a URL from props/state

  const imageUrl = '/img/tile-grid.png' // or a URL from props/state

  const params = useParams()
  const { id } = params // Extract the 'id' from params
  const [monthData, setMonthData] = useState<MtaData | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json') // Fetching from the public folder
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        const monthEntry = data.mta_data.find(
          (entry: MtaData) => entry.month.toLowerCase() === id
        )
        setMonthData(monthEntry || null)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }

    fetchData()
  }, [id])

  if (!monthData) {
    return <div>No data available for this month.</div>
  }

  return (
    <div>
      <main>
        <section
          className="overflow-hidden relative bg-repeat bg-[size:160px] bg-opacity-50"
          style={{
            backgroundImage: `url(${imageUrl})`,

            backgroundPosition: `center ${scrollY * 0.5}px`, // Adjust movement speed
          }}
        >
          <div className="flex flex-col items-center p-10">
            <img src="/img/logo-long.svg" alt="" className="mb-8" />

            <div className="p-4 m-auto bg-[#73A29E] inline-block">
              <div className="px-4 py-3 bg-[#1A2D70] inline-block">
                <p className="text-center font-mono uppercase text-white text-4xl">
                  {monthData.month}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="overflow-hidden relative bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url(${subwayBgUrl})` }}
        >
          <div className="relative">
            <div className="flex justify-center m-10 max-[500px]:mx-4 max-[500px]:my-6">
              <div className="grid grid-col items-center p-8 max-[500px]:p-2">
                <h2 className="text-[3vw] max-[500px]:text-[20px] font-bold leading-tight text-white text-center tracking-tight relative">
                  The Naughty Line
                </h2>
                <div className="flex gap-[8px] justify-center my-6">
                  {monthData.naughty_line.split('').map((char, index) => (
                    <div
                      key={index}
                      className="rounded-full w-[64px] h-[64px] flex items-center justify-center "
                      style={{
                        backgroundColor:
                          subway_lines[
                            monthData.naughty_line[0] as SubwayLineKeys
                          ], // use color of first letter only
                      }}
                    >
                      <h2 className="text-4xl font-bold text-white text-center">
                        {char}
                      </h2>
                    </div>
                  ))}
                </div>

                <div className="transform transition-transform duration-300 ease-in-out hover:shadow-[0_4px_100px_#E70000] hover:translate-y-[-8px] rounded-full">
                  <img
                    src="/img/naughty-train.svg"
                    alt=""
                    className="z-0 m-auto max-w-[30vw]"
                  />
                </div>
              </div>

              <div className="grid grid-col items-center p-8 max-[500px]:p-2">
                <h2 className="text-[3vw] max-[500px]:text-[20px] font-bold leading-tight text-white text-center tracking-tight relative">
                  The Nice Line
                </h2>
                <div className="flex gap-[8px] justify-center my-6">
                  {monthData.nice_line.split('').map((char, index) => (
                    <div
                      key={index}
                      className="rounded-full w-[64px] h-[64px] flex items-center justify-center "
                      style={{
                        backgroundColor:
                          subway_lines[
                            monthData.nice_line[0] as SubwayLineKeys
                          ], // use color of first letter only
                      }}
                    >
                      <h2 className="text-4xl font-bold text-white text-center">
                        {char}
                      </h2>
                    </div>
                  ))}
                </div>

                <div className="transform transition-transform duration-300 ease-in-out hover:shadow-[0_4px_100px_#11760E] hover:translate-y-[-8px] rounded-full">
                  <img
                    src="/img/nice-train.svg"
                    alt=""
                    className="z-0 m-auto max-w-[30vw]"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="overflow-hidden relative bg-repeat bg-[size:160px] bg-opacity-50"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="m-auto">
            <div className="grid grid-cols-2 grid-auto-rows justify-center w-[80vw] max-[500px]:w-full m-auto">
              <div className="grid grid-rows-3 p-[7vw] gap-16 max-[500px]:gap-8 border-r-2 border-black">
                <TextBlock
                  overline="CROWDEDNESS"
                  color="bg-[#FF8840]"
                  header={monthData.naughty_busyness_rank}
                  description={monthData.naughty_busyness_note}
                />
                <TextBlock
                  overline="TIMELINESS"
                  color="bg-[#FFC801]"
                  header={monthData.naughty_ontime_rank}
                  description={monthData.naughty_ontime_note}
                />
                <TextBlock
                  overline="RELIABILITY"
                  color="bg-[#9FC438]"
                  header={monthData.naughty_reliability_rank}
                  description={monthData.naughty_reliability_note}
                />
              </div>
              <div className="grid grid-rows-3 p-[7vw] gap-16 max-[500px]:gap-8">
                <TextBlock
                  overline="CROWDEDNESS"
                  color="bg-[#FF8840]"
                  header={monthData.nice_busyness_rank}
                  description={monthData.nice_busyness_note}
                />
                <TextBlock
                  overline="TIMELINESS"
                  color="bg-[#FFC801]"
                  header={monthData.nice_ontime_rank}
                  description={monthData.nice_ontime_note}
                />
                <TextBlock
                  overline="RELIABILITY"
                  color="bg-[#9FC438]"
                  header={monthData.nice_reliability_rank}
                  description={monthData.nice_reliability_note}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className="overflow-hidden text-white relative bg-cover bg-fixed bg-center"
          style={{ backgroundImage: `url(${subwayBgUrl})` }}
        >
          <h1 className="text-[3vw] max-[500px]:text-[24px] font-bold font-white m-auto text-center tracking-tight leading-tight relative pt-20 z-10">
            Thanks for stopping by!
          </h1>
          <Link href={`/`}>
            <button className="px-8 py-10 m-auto flex flex-col items-center transform transition-transform duration-300 ease-in-out hover:translate-y-[-8px]">
              <p className="font-mono uppercase mb-4">Back to the station!</p>

              <img
                src="/img/metrocard.png"
                className="transform transition-transform duration-300 ease-in-out hover:shadow-[0_4px_100px_#FFC801]"
                alt=""
              />
            </button>
          </Link>

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
