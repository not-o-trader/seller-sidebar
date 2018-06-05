create table sellers (
    id int generated by default as identity primary key,
    name varchar(256),
    brand varchar(256),
    address varchar(256),
    city varchar(256),
    state char(2),
    zip varchar(10),
    phone varchar(14),
    email varchar(256),
    logo_url varchar(512)
);