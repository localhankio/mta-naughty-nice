import os
from datetime import datetime, timedelta
import psycopg2


# Code to import the CSV fils dowrloaded by download_mta_data.py to our PostgreSQL database

host = os.environ['DB_HOSTNAME']
user = os.environ['DB_USERNAME']
password = os.environ['DB_PASSWORD']
db_name = ''
schema_name = ''
conn = psycopg2.connect(host=host, port='5432', dbname=db_name, user=user, password=password, options=f"-c search_path={schema_name}")

start_stamp='2023-01-01T23:00:00.000'
end_stamp='2023-12-31T23:00:00.000'

iter_time = datetime.strptime(start_stamp, '%Y-%m-%dT%H:%M:%S.%f')
end_timestamp = datetime.strptime(end_stamp, '%Y-%m-%dT%H:%M:%S.%f')

path_prefix = ''
with conn:
    while iter_time <= end_timestamp:
        time_suffix = iter_time.isoformat()
        csv_path = f'{path_prefix}_{time_suffix}.csv'
        print(f'Uploading file: {time_suffix}')
        with open(csv_path, 'r') as f:
            with conn.cursor() as cur:
                cur.copy_expert("COPY mta_hourly FROM STDIN DELIMITER ',' CSV HEADER", f)
            print(f'\tWritten file mta_hourly_{csv_path}')
        iter_time = iter_time + timedelta(days=1)
conn.close()
