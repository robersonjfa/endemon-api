create table usuario (
	codusu serial primary key,
	logusu varchar(20) not null,
	senusu varchar(32) not null
);

create table pessoa(
	codpes serial primary key,
	nompes varchar(40));
	
create table residencia(
	codres serial primary key,
	latres numeric(10,6),
	lngres numeric(10,6),
	cplres varchar(40) not null
);

create table armadilha(
	codarm serial primary key,
	desarm varchar(80)
);

create table residencia_pessoa(
	codres integer not null references residencia(codres),
	codpes integer not null references pessoa(codpes),
	datcad timestamp default current_timestamp,
	primary key(codres, codpes)
);

create table residencia_armadilha(
	codres integer not null references residencia(codres),
	codarm integer not null references armadilha(codarm),
	datini date,
	datfim date not null,
	obsarm text
);

create table caso(
	codcas serial primary key,
	codpes integer not null references pessoa(codpes),
	latcas numeric(10,6),
	lngcas numeric(10,6),
	datcadcas timestamp default current_timestamp
);


insert into pessoa(nompes) values
('Fulano da Silva'),
('Beltrano da Cunha'),
('Ciclana Coelho'),
('Fulana Coimbra');

insert into usuario(logusu, senusu) values
('endemon', 'endemon');