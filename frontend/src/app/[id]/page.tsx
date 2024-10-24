'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import TextBlock from '../components/text-block'

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
                <p className="text-center font-mono uppercase text-white text-5xl">
                  {monthData.month}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="overflow-hidden relative bg-cover h-screen bg-fixed bg-center"
          style={{ backgroundImage: `url(${subwayBgUrl})` }}
        >
          <div className="relative">
            <div className="flex justify-center m-10">
              <div className="flex flex-col items-center p-10">
                <h2 className="text-3xl font-bold text-white text-center tracking-tight relative">
                  The Naughty Line
                </h2>
                <div
                  className="rounded-full w-[50px] h-[50px] flex items-center justify-center m-8"
                  style={{
                    backgroundColor:
                      subway_lines[monthData.naughty_line as SubwayLineKeys],
                  }}
                >
                  <h2 className="text-3xl font-bold text-white text-center">
                    {monthData.naughty_line}
                  </h2>
                </div>
                <img src="/img/naughty-train.svg" alt="" className="z-0" />
              </div>

              <div className="flex flex-col items-center p-10">
                <h2 className="text-3xl font-bold text-white text-center tracking-tight relative">
                  The Nice Line
                </h2>
                <div
                  className="rounded-full w-[50px] h-[50px] flex items-center justify-center m-8"
                  style={{
                    backgroundColor:
                      subway_lines[monthData.nice_line as SubwayLineKeys],
                  }}
                >
                  <h2 className="text-3xl font-bold text-white text-center">
                    {monthData.nice_line}
                  </h2>
                </div>
                <img src="/img/nice-train.svg" alt="" className="z-0" />
              </div>
            </div>
          </div>
        </section>

        <section
          className="overflow-hidden relative bg-repeat bg-[size:160px] bg-opacity-50"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="m-auto">
            <div className="flex flex-row justify-center">
              <div className="flex flex-col p-[8vw] gap-20 border-r-2 border-black">
                <TextBlock
                  overline="BUSYNESS"
                  color="bg-[#FF8840]"
                  header={monthData.naughty_busyness_rank}
                  description={monthData.naughty_busyness_note}
                />
                <TextBlock
                  overline="TARDINESS"
                  color="bg-[#FFC801]"
                  header={monthData.naughty_ontime_rank}
                  description={monthData.naughty_ontime_note}
                />
                <TextBlock
                  overline="MAJOR INCIDENTS"
                  color="bg-[#9FC438]"
                  header={monthData.naughty_reliability_rank}
                  description={monthData.naughty_reliability_note}
                />
              </div>
              <div className="flex flex-col p-[8vw] gap-20">
                <TextBlock
                  overline="BUSYNESS"
                  color="bg-[#FF8840]"
                  header={monthData.nice_busyness_rank}
                  description={monthData.nice_busyness_note}
                />
                <TextBlock
                  overline="TARDINESS"
                  color="bg-[#FFC801]"
                  header={monthData.nice_ontime_rank}
                  description={monthData.nice_ontime_note}
                />
                <TextBlock
                  overline="MAJOR INCIDENTS"
                  color="bg-[#9FC438]"
                  header={monthData.nice_ontime_rank}
                  description={monthData.nice_ontime_note}
                />
              </div>

              <div className="flex flex-col my-16"></div>
            </div>
          </div>
        </section>
      </main>
    </div>

    // <div>
    //   <h2>Data for {monthData.month}</h2>
    //   <p>Naughty Line: {monthData.naughty_line}</p>
    //   <p>Nice Line: {monthData.nice_line}</p>
    //   <p>Naughty Busyness Rank: {monthData.naughty_busyness_rank}</p>
    //   <p>Naughty On-Time Rank: {monthData.naughty_ontime_rank}</p>
    //   <p>Naughty On-Time Note: {monthData.naughty_ontime_note}</p>
    //   <p>Naughty Reliability Rank: {monthData.naughty_reliability_rank}</p>
    //   <p>Naughty Reliability Note: {monthData.naughty_reliability_note}</p>
    //   <p>Nice Busyness Rank: {monthData.nice_busyness_rank}</p>
    //   <p>Nice Busyness Note: {monthData.nice_busyness_note}</p>
    //   <p>Nice On-Time Rank: {monthData.nice_ontime_rank}</p>
    //   <p>Nice On-Time Note: {monthData.nice_ontime_note}</p>
    //   <p>Nice Reliability Rank: {monthData.nice_reliability_rank}</p>
    //   <p>Nice Reliability Note: {monthData.nice_reliability_note}</p>
    // </div>
  )
}
