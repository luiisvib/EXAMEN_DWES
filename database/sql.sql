CREATE DATABASE IF NOT EXISTS APP_EXAM;
USE APP_EXAM;

DROP TABLE IF EXISTS FOTOS;
CREATE TABLE FOTOS(
    id int UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo varchar(45) NOT NULL,
    url varchar(500) NOT NULL,
    descripcion varchar(244) NOT NULL,
    fecha TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO FOTOS VALUES(DEFAULT,"Paisajes","/images/imagen1.jpeg","Esto es un paisaje muy bonito",DEFAULT);
INSERT INTO FOTOS VALUES(DEFAULT,"Tigre","/images/imagen2.jpeg","Esto es un tigre muy bonito",DEFAULT);
INSERT INTO FOTOS VALUES(DEFAULT,"Elefante","/images/imagen3.jpeg","Esto es un elefante muy bonito",DEFAULT);