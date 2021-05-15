create table employee
(
	empID int null,
	empName varchar(200) null,
	designation varchar(100) null,
	branch_name varchar(200) null,
	branch_code int null,
	region_code int null,
	zone_code int null,
	emailID varchar(100) null,
	phone varchar(13) null,
	admin boolean default false null,
	token varchar(2000) null,
	token_details varchar(5000) null
);
alter table patient add covid_postive_date date null;

create table StaffEmployee
(
    StaffEmpNo   text null,
    name         text null,
    LocationType text null,
    LocationID   text null,
    BranchName   text null,
    RegionID     text null,
    RegionName   text null,
    ZoneID       text null,
    ZoneName     text null,
    email        text null,
    mobile       text null,
    role         text null,
    active       text null,
    EnteredDt    text null,
    ModifiedDt   text null,
    DeletedDt    text null,
    Alt_mobile   text null
);

