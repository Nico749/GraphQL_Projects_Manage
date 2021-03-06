const express = require ('express')
require ('dotenv').config()
const cors = require('cors')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const colors = require ("colors")
const connectDB = require('./config/db')

const port = process.env.PORT || 5000

const app = express()

//connect to db
connectDB()

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    // graphiql make us able to make queries using the schema we import
    graphiql:process.env.NODE_ENV === 'development'

}))

app.listen(port, console.log(`Server running on port ${port}`))