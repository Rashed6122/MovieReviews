// import
import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'

// creat server
const app = express()

// attach cors and express middleware the express will use
app.use(cors())
app.use(express.json())

// init routes
app.use("/api/v1/movies", movies)
app.use ('*', (req, res) => {
    res.status(404).json({error: "Not Found"})
})

export default app