------------------------
---Author: Zack Abu-Akeel
---Major Incidents
------------------------
create table zack_major_incidents as
select month, line,sum(count) as major_incident_count
from mta.data.mta_subway_major_incidents
where month between '2023-01-01' and '2023-12-31'
and line not in ('S 42nd','S Fkln','S Rock','Systemwide')
group by 1,2
order by 1,3 desc;
