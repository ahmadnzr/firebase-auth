const express = require("express")
const cors = require('cors')
const middleware = require("./middleware")

const app = express()
const port = 8080

app.use(cors())

app.use(middleware.decodeToken)

app.get('/api/todos', (req, res) =>{
    console.log(req.user);
    return res.json({
        todos:[
            {
                id: 1,
                title: "task 1"
            },
            {
                id: 2,
                title: "task 2"
            }
        ]
    })
})

app.listen(port, () =>{
    console.clear()
    console.log('listening on port 8080');
})