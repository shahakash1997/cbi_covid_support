create table patient
(
    id         int auto_increment
        primary key,
    empID      tinytext not null,
    name       text     not null,
    age        int      null,
    relation   tinytext null,
    mobile     tinytext not null,
    location   text     null,
    locationZO text     not null,
    locationRO text     not null,
    gender     tinytext null
);

create table requested_covid_supports
(
    id         int auto_increment
        primary key,
    patient_id int           not null,
    support    varchar(2000) null,
    constraint requested_covid_supports_patient_id_fk
        foreign key (patient_id) references patient (id)
            on delete cascade
);

create table help_comments
(
    id                   int auto_increment
        primary key,
    requested_support_id int  null,
    comments             text null,
    updateByName         text null,
    updatedBy            text null,
    datetime             text null,
    constraint help_comments_requested_covid_supports_id_fk
        foreign key (requested_support_id) references requested_covid_supports (id)
            on delete cascade
);

create table support_options
(
    id      int auto_increment
        primary key,
    active  tinyint(1)   null,
    support varchar(200) null
);


