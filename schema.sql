create table address(
    linkaddress varchar(300) PRIMARY KEY,
    owner_address varchar(300) NOT NULL
);

create table link(
    id SERIAL UNIQUE,
    linkaddress varchar(300) REFERENCES address(linkaddress),
    symbol varchar(100) NOT NULL,
    account_address varchar(300) NOT NULL,
    PRIMARY KEY (linkaddress, symbol)
);