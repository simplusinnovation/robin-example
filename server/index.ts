import * as express from "express"
import {json} from 'body-parser'
import {v4} from 'uuid'
import {db} from './db'

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})
app.use(json())

// Get all posts
app.get('/posts', (req, res ,next) => {
    res.json(db.posts)
})

//Get a random post
app.get('/posts/random', (req, res, next) => {
    let index = Math.floor(Math.random() * db.posts.length)

    if(db.posts.length === 0)
        return res.json(null)

    res.json(db.posts[index])
})

//Get a specific post
app.get('/posts/:id', (req, res, next) => {
    let o = db.posts.filter( p => p.id === req.params.id)
    if(o.length === 0)
        return res.sendStatus(404)
    res.json(o[0])
})

//Creates a Post
app.post('/posts', (req, res, next) => {
    if(!req.body.title || !req.body.text || !req.body.author)
        return res.sendStatus(500)
    
    let inserted = {
        id : v4(),
        title : req.body.title,
        text : req.body.text,
        date : new Date(Date.now()),
        author : req.body.author,
        likes : 0
    }

    db.posts.push(inserted)

    res.json(inserted)
})

//Likes a post
app.get('/posts/:id/like', (req, res, next) => {
    let o = db.posts.filter( p => p.id === req.params.id)
    if(o.length === 0)
        return res.sendStatus(404)
    o[0].likes++
    
    res.json(o[0])
})

app.listen(3005, null, () => {
    console.log("Server is running")
})