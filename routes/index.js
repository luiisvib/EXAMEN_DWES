const express = require('express');
const router = express.Router();
const pool = require("../db")
const jwt = require("jsonwebtoken")

//Página de Inicio donde se puede insertar una nueva imagen
router.get('/', function(req, res, next) {
  res.render('index', {titulo: "Inicio"});
});

//Página de todas las fotos
router.get("/fotos", async (req,res) =>{
  const [datos_fotos] = await pool.query("SELECT * FROM FOTOS")
  const [datos_comentarios] = await pool.query(`SELECT * FROM COMENTARIOS`)
  res.render("fotos", {datos_fotos: datos_fotos, datos_comentarios: datos_comentarios, titulo: "Fotos"})
})

//Página de las fotos mas votadas
router.get("/fotos/masvotadas", async (req, res) =>{
  const [datos_fotos] = await pool.query("SELECT * FROM FOTOS ORDER BY  likes DESC limit 3")
  const [datos_comentarios] = await pool.query(`SELECT * FROM COMENTARIOS`)
  res.render("fotos", {datos_fotos: datos_fotos, datos_comentarios: datos_comentarios, titulo: "Fotos"})
})

//Página de las fotos menos votadas
router.get("/fotos/menosvotadas", async (req, res) =>{
  const [datos_fotos] = await pool.query("SELECT * FROM FOTOS ORDER BY  likes ASC limit 3")
  const [datos_comentarios] = await pool.query(`SELECT * FROM COMENTARIOS`)
  res.render("fotos", {datos_fotos: datos_fotos, datos_comentarios: datos_comentarios, titulo: "Fotos"})
})

//Página de las fotos comentadas
router.get("/fotos/comentadas", async (req, res) =>{
  const [datos_fotos] = await pool.query("SELECT * FROM FOTOS WHERE id IN (SELECT id_foto FROM COMENTARIOS) ORDER BY likes ASC limit 3")
  const [datos_comentarios] = await pool.query(`SELECT * FROM COMENTARIOS`)
  res.render("fotos", {datos_fotos: datos_fotos, datos_comentarios: datos_comentarios, titulo: "Fotos"})
})

//Página de las fotos no comentadas
router.get("/fotos/nocomentadas", async (req, res) =>{
  const [datos_fotos] = await pool.query("SELECT * FROM FOTOS WHERE id NOT IN (SELECT id_foto FROM COMENTARIOS)")
  const [datos_comentarios] = await pool.query(`SELECT * FROM COMENTARIOS`)
  res.render("fotos", {datos_fotos: datos_fotos, datos_comentarios: datos_comentarios, titulo: "Fotos"})
})

//Post que recoje los datos del formulario para subir una foto y lo guarda en la base de datos 
router.post("/subirfoto", async (req, res) =>{
  const {titulo, url, descripcion} = req.body
  const datos_insertados = await pool.query(`INSERT INTO FOTOS(titulo, url, descripcion, likes, dislikes) VALUES('${titulo}', '${url}', '${descripcion}', 0, 0)`)
  const token = jwt.sign(datos_insertados[0].insertId , "my_secret_key")
  console.log(token)
  res.render("token", {titulo: "Titulo", token:token}) //Te dirige a token.ejs donnde muestra el token
})



//Reridigir al formulario para solicitar token
router.get("/comprobar_form/:id", (req,res)=>{
  const {id} = req.params
  res.render("comprobar_token", {titulo: "Titulo", id: id})
})

//Comprobar token 
router.post("/comprobar_token/:id", (req,res)=>{
  const {id} = req.params
  const {token} = req.body
  jwt.verify(token, "my_secret_key", async (error,datos) =>{
    if(error){
      res.render("mensaje_eliminacion", {mensaje: "DATO NO ELIMINADO", titulo: "Mensaje no eliminado"})
    }else{
      await pool.query(`DELETE FROM FOTOS where id=${id}`)
      res.render("mensaje_eliminacion", {mensaje: "DATO ELIMINADO", titulo: "Mensaje eliminado"})
    }
  })
})

//Para actualizar los likes de la base de datos
router.get("/like/:id", async (req, res) =>{ //Recogemos la id de la foto a la que hemos dado like
  const {id} = req.params
  await pool.query(`UPDATE FOTOS SET likes=likes+1 WHERE id=${id}`)
  res.redirect("/fotos")
})

//Para actualizar los likes de la base de datos
router.get("/dislike/:id", async (req, res) =>{
  const {id} = req.params
  await pool.query(`UPDATE FOTOS SET dislikes=dislikes+1 WHERE id=${id}`)
  res.redirect("/fotos")
})

//Recojer la id (de la foto que hemos comentado), usuario y comentario y enviarlos a la base de datos
router.post("/enviarcomentario/:id", async(req,res) =>{
  const {id} = req.params
  const {usuario, comentario} = req.body
  await pool.query(`INSERT INTO COMENTARIOS(id_foto, usuario,comentario) VALUES (${id},'${usuario}', '${comentario}')`)
  res.redirect("/fotos")
})

module.exports = router;
