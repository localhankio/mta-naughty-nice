# MTA Naughty Train Line & Nice Train Line
Awarding the Naughty train line of the month, and Nice train line of the month.

## Contributors
Zack Abu-Akeel, Kristina Cheng, Hank Shen, Pauline Wee (pls hire her)

Special thanks:

Gifan Thadathil


## Project Description
Website: [https://mta-naughty-nice2.vercel.app/](https://mta-naughty-nice2.vercel.app/)

Companies have Employee of the Month, and the New Zealand zoo has Naughty Penguin of the Month, but do we know which 
service is the naughtiest of the month? And which one is the nicest? We rank each service based on three criteria to 
award the Naughtiest and Nicest Line of the Month for each month in 2023. The criteria are Crowdedness, Timeliness, and 
Reliability. Each category is weighted the same, and the sum of all three ranks is the final score we use to judge lines,
with a lower score (rank) being better. The shuttle services were excluded from our analysis.

### Methodology
We measured Crowdedness by calculating the deviation in volume of ridership for each train in a given month relative to 
that train’s average monthly ridership for the year. To calculate monthly ridership, we summed ridership across each 
station for a line from the Subway Hourly Ridership dataset. If multiple services stop at a station, we divide the 
ridership by the number of lines at that station and attribute the divided ridership equally across all lines. If 
Times Square-42nd Street has 15,000 riders per day and 8 services, we add 1,875 riders to each service for that day. It 
is a rough estimate for total ridership per service.

The service with the best performance in this category is the one that is least crowded in that month relative to their 
monthly average for the year, and the worst service is the most crowded relative to their average.

Timeliness is measured  through the combination of two metrics: `terminal_on_time_performance` from the Subway Terminal 
On-Time Performance dataset and `additional_platform_time` from the Subway Customer Journey-Focused Metrics dataset. 
Trains with a higher value for `terminal_on_time_performance` and a lower value for `additional_platform_time` are ranked as
better performing for that month. Both metrics were weighted equally.

Reliability is measured through the count of major incidents from the Subway Major Incidents dataset for a line in a 
given month. A higher count of major incidents results in a lower ranking for that train in that month.

### Open Datasets Used to Calculate Crowdedness
[MTA Subway Hourly Ridership: Beginning February 2022](https://data.ny.gov/Transportation/MTA-Subway-Hourly-Ridership-Beginning-February-202/wujg-7c2s/about_data)

### Open Datasets Used to Calculate Timeliness
[MTA Subway Customer Journey Focused Metrics: Beginning 2020](https://data.ny.gov/Transportation/MTA-Subway-Customer-Journey-Focused-Metrics-Beginn/4apg-4kt9/about_data)
[MTA Subway Terminal On-Time Performance: Beginning 2020](https://data.ny.gov/Transportation/MTA-Subway-Terminal-On-Time-Performance-Beginning-/vtvh-gimj/about_data)

### Open Datasets Used to Calculate Reliability
[MTA Subway Major Incidents: Beginning 2020](https://data.ny.gov/Transportation/MTA-Subway-Major-Incidents-Beginning-2020/j6d2-s8m2/data_preview)

### Interesting Findings
* Several trains had the highest Reliability rank of a month, but poor ranks in Crowdedness and Timeliness, such as the D train in December 2023.
* The L train won Nicest Train of the Month the most, for a total of 5 times in 2023
* The M train won Naughtiest Train of the Month the most, also for 5 times in 2023
* Only IND lines won the Naughtiest awards. Naughty system, huh?
