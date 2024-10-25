---------------------------------------------------------
---Author: Zack Abu-Akeel
---TERMINAL ON TIME PERFORMANCE----
---------------------------------------------------------

--Pull weekday ontime performance (day_type=1)
create table zack_weekday_ontime_performance as
select month,line,terminal_on_time_performance from mta.data.mta_subway_terminal_on_time_performance mstotp
where month between '2023-01-01' and '2023-12-31'
and line not in ('S 42nd','S Fkln','S Rock','Systemwide')
and day_type=1;

--Pull weekend ontime performance (day_type=2)
create table zack_weekend_ontime_performance as
select month,line,terminal_on_time_performance from mta.data.mta_subway_terminal_on_time_performance mstotp
where month between '2023-01-01' and '2023-12-31'
and line not in ('S 42nd','S Fkln','S Rock','Systemwide')
and day_type=2;

--Combine Weekday and Weekend
create table zack_totp_monthly as
select t1.month,t1.line
,((t1.terminal_on_time_performance) * (22.0 / 30.5)) -- weekday_performance
+((t2.terminal_on_time_performance) * (8.0 / 30.5))  --weekend_performance
as monthly_tot_performance
from zack_weekday_ontime_performance t1
inner join zack_weekend_ontime_performance t2
on t1.month=t2.month
and t1.line=t2.line

union

select month,line,terminal_on_time_performance as monthly_tot_performance
from zack_weekday_ontime_performance
where line ilike 'B'
order by 1,2;

--Need to normalize the apt values
select min(monthly_apt), max(monthly_apt) from zack_apt_monthly;
--min: 0.6192090511322021 max: 2.5597360134124756

create table zack_apt_monthly_normalized as
select month,line
,(1-((monthly_apt - 0.6192090511322021) / (2.5597360134124756-0.6192090511322021)))*100 as monthly_apt_normalized
from zack_apt_monthly;

create table zack_combined_timeliness_score as
select t1.month,t1.line,t1.monthly_apt_normalized, t2.monthly_tot_performance
,(t1.monthly_apt_normalized+ t2.monthly_tot_performance)/2 as monthly_timeliness_score
from zack_apt_monthly_normalized t1
left join zack_totp_monthly t2
on t1.month=t2.month
and t1.line=t2.line
where t2.line not ilike 'w'

union

select month,line,monthly_apt_normalized, null as monthly_tot_performance, monthly_apt_normalized as monthly_timeliness_score
from zack_apt_monthly_normalized
where line ilike 'w'
;

----table that ranks all trains
create table zack_naughty_nice_timeliness_rank as
select month,line,monthly_apt_normalized,monthly_tot_performance,monthly_timeliness_score
,rank() over (partition by month order by monthly_timeliness_score desc) as timeliness_rank
from zack_combined_timeliness_score
order by 1;
