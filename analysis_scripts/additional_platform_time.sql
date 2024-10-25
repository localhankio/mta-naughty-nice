---------------------------------------------------------
---Author: Zack Abu-Akeel
---ADDITIONAL PLATFORM TIME (APT)----
---------------------------------------------------------


create table zack_peak_apt as
select month,line,"additional platform time" from mta.data.mta_subway_customer_journey_focused_metrics
where month between '2023-01-01' and '2023-12-31'
and line not in ('S 42nd','S Fkln','S Rock','Systemwide')
and period='peak';

create table zack_offpeak_apt as
select month,line,"additional platform time" from mta.data.mta_subway_customer_journey_focused_metrics
where month between '2023-01-01' and '2023-12-31'
and line not in ('S 42nd','S Fkln','S Rock','Systemwide')
and period='offpeak';

--Combine Peak and Offpeak
create table zack_apt_monthly as
select t1.month,t1.line
,(t1."additional platform time" --peak apt
+ t2."additional platform time")/2 --offpeak apt
as monthly_apt
from zack_peak_apt t1
inner join zack_offpeak_apt t2
on t1.month=t2.month
and t1.line=t2.line
order by 1,2;
