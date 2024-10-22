--
Author: Kristina Cheng
--
create table mta_monthly_ridership_by_line as
select
    (regexp_match(station_complex, '\((.*?)\)'))[1] as line,
    extract(month from transit_timestamp::timestamp) as month,
    sum(ridership::numeric::int) as monthly_ridership
from mta_hourly
where extract(year from transit_timestamp::timestamp) = 2023
group by 1,2;

create table split_lines as

select
	line,
	month,
	monthly_ridership,
	regexp_split_to_table(line, ',') as individual_line,
	array_length(string_to_array(line, ','), 1) as num_lines
 from mta_monthly_ridership_by_line
 where line like '%,%' ;


create table monthly_ridership_prelim as
 select
    individual_line as line,
    month,
    (monthly_ridership::numeric / num_lines)::int as monthly_ridership
 from split_lines

  UNION ALL

 select
    line,
    month,
    monthly_ridership
 from mta_monthly_ridership_by_line
  where line not like '%,%';

create table monthly_ridership as

 select case when line in ('J', 'Z') then 'JZ' else line end as line, month, sum(monthly_ridership)
 from monthly_ridership_prelim
 group by 1,2;

 select * from monthly_ridership order by 2,1;

create table monthly_averages as

select line, avg(sum) as monthly_average
from monthly_ridership
group by 1;

create table monthly_ridership_deviations as

select r.line,
       r.month,
       (sum - monthly_average)/monthly_average as pct_above_average,
       monthly_average
from monthly_ridership r
left join monthly_averages a
on r.line = a.line;

create table monthly_peace_rankings as

select month,
       line,
       pct_above_average,
       monthly_average,
       dense_rank() over (partition by month order by pct_above_average) as peacefulness_rank
from monthly_ridership_deviations
where line not ilike '%st%' and line <> 'S' and line <> 'SIR';

select * from monthly_peace_rankings;

select * from mta.public.zack_naughty_nice_timeliness_rank;


create table incident_rankings as

select month, line, dense_rank() over (partition by month order by major_incident_count) as incident_rank
from mta.public.zack_major_incidents;


create table interim as

select t.month, t.line, (incident_rank + peacefulness_rank + timeliness_rank) as overall_rank, incident_rank, peacefulness_rank, timeliness_rank
from monthly_peace_rankings p
left join mta.public.zack_naughty_nice_timeliness_rank t
on extract(month from t.month::date) = p.month and p.line = t.line
left join incident_rankings i
on extract(month from i.month::date) = p.month and p.line = i.line;

create table rank_results as

select month, line,
       case when incident_rank is null then 1 else (incident_rank + 1) end as incident_rank,
       timeliness_rank,
       peacefulness_rank,
      row_number() over (partition by month order by overall_rank, timeliness_rank) as final_rank
from interim;

select * from rank_results;


