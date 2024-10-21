import csv
from datetime import datetime, timedelta
import os

import requests


url = f"https://data.ny.gov/resource/wujg-7c2s.json"
headers = {
    'X-App-Token': os.environ['MTA_APP_TOKEN']
}

limit = 100000
start_stamp = '2024-01-01T00:00:00.000'
end_stamp = '2024-09-30T00:00:00.000'

start_timestamp = datetime.strptime(start_stamp, '%Y-%m-%dT%H:%M:%S.%f')
transit_timestamp = datetime.strptime(start_stamp, '%Y-%m-%dT%H:%M:%S.%f')
end_timestamp = datetime.strptime(end_stamp, '%Y-%m-%dT%H:%M:%S.%f')

batch_24_hour = []
batch_count = 0
while transit_timestamp <= end_timestamp:
    strtstamp = transit_timestamp.isoformat()
    print(f"Requesting for timestamp: {strtstamp}")
    params = {
        "$limit": limit,
        "transit_mode": "subway",
        "transit_timestamp": strtstamp
    }
    response = requests.request("GET", url, headers=headers, params=params)
    hourly_data = response.json()  # list of data
    transit_timestamp = transit_timestamp + timedelta(hours=1)

    if len(hourly_data) > 0:
        keys = hourly_data[0].keys()
        events = len(hourly_data)
        print(f'Got data for m: {transit_timestamp.month}, d:{transit_timestamp.day}, h: {transit_timestamp.hour}')
    else:
        # a day in Feb 2023 randomly has no data
        print(f'No hourly data for {transit_timestamp}')
        continue

    batch_24_hour.extend(hourly_data)
    batch_count += events
    if transit_timestamp.hour == 0 or transit_timestamp == start_timestamp:
        file_prefix = "./mta_hourly"
        file_path = f"{file_prefix}_{strtstamp}.csv"
        print(
            f'At day {transit_timestamp.day}, hour {transit_timestamp.hour}, writing to file {strtstamp}. count: {len(batch_24_hour)}, batch_count, {batch_count}')
        with open(file_path, "w", newline="") as f_part:
            dict_writer = csv.DictWriter(f_part, keys, lineterminator='\n')
            dict_writer.writeheader()
            dict_writer.writerows(batch_24_hour)
        batch_24_hour.clear()
        batch_count = 0
