DROP DATABASE IF EXISTS  APP_EXAM;
CREATE DATABASE IF NOT EXISTS APP_EXAM;
USE APP_EXAM;

DROP TABLE IF EXISTS FOTOS;
CREATE TABLE FOTOS(
    id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo varchar(45) NOT NULL,
    url varchar(500) NOT NULL,
    descripcion varchar(244) NOT NULL,
    likes int,
    dislikes int,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO FOTOS(titulo,url,descripcion,likes, dislikes)  VALUES("Paisajes","/images/imagen1.jpeg","Esto es un paisaje muy bonito",0,0);
INSERT INTO FOTOS(titulo,url,descripcion,likes, dislikes) VALUES("Tigre","/images/imagen2.jpeg","Esto es un tigre muy bonito",0,0);
INSERT INTO FOTOS(titulo,url,descripcion,likes, dislikes)  VALUES("Elefante","/images/imagen3.jpeg","Esto es un elefante muy bonito",0,0);

DROP TABLE IF EXISTS COMENTARIOS;
CREATE TABLE COMENTARIOS(
    id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_foto int UNSIGNED,
    usuario varchar(45) NOT NULL,
    comentario varchar(500) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);