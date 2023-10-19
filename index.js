//const http = require('http')

const { response } = require('express')
const express = require('express')
const nodemon = require('nodemon')
const app = express ()
app.use(express.json())


let notes = [
    {
      id: 1,
      content: "Probando implementacion de nodemon",
      date: "2019-05-30T17:30:31.098Z",
      important: false
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2019-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2019-05-30T19:20:14.298Z",
      important: true
    }
  ]

  let subs = [
    {
      nick: "Madigans",
      months: 3,
      profileUrl: "https://i.pravatar.cc/150?u=Madigans",
      description: "Madigans es agradable"
    },
    {
      nick: "Jorge",
      months: 3,
      profileUrl: "https://i.pravatar.cc/150?u=Jorge",
      description: "Jorge es mal educado"
    },
    {
      nick: "Roman",
      months: 3,
      profileUrl: "https://i.pravatar.cc/150?u=Roman",
      description: "Roman es inteligente"
    }]
/*
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(notes))
})
*/

app.get('/subs', (request, response)=> {
  response.json(subs)
})

app.get('/', (request, response)=> {
    response.send('<H1>mi primer get</H1>')
})
app.get('/api/notes', (request, response)=> {
    response.json(notes)
})
app.get('/api/notes/:id', (request, response)=> {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if(note){
        response.json(note)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/notes/:id', (request,response)=>{
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
    
})

//si el arreglo de notas es mayor a 0, con la funcion map recupera todos los valores de id y con la funcion max tomas el valor maximo
//si el arreglo de notas es menor o igual a 0, el valor es 0
const genereteId = () =>{
  console.log("arreglo de notas "+notes.length)
  const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)) : 0
  return maxId + 1
}

app.post('/api/notes', (request,response) => {
  const note = request.body

  //si la nota carece de contenido, responde con un error
  if(!note.content){
    return response.status(400).json({
      error:'note.content is missing'
    })
  }
  
  const newNote = {
    id: genereteId(),
    content: note.content,
    date: new Date().toISOString(), // toma la fecha de hoy
    important: typeof note.important !== 'undefined' ? note.important : false //expresion if si el valor es diferente de undefined se asigna el valor, caso contrario pone false por defecto
  }
  notes = notes.concat(newNote) //formas de concatenar
  response.json(newNote)
})

const PORT = 3001

//el servidor se levanta de forma asincrona con express
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
})
