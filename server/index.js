const express =require("express")
const cors = require("cors")
const { title } = require("process")
const app = express()
const PORT = 4000
const http = require("http").Server(app)
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

app.use(express.urlencoded({ extended: true}))
app.use(express.json())



app.use(cors())

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
            socket.disconnect()
      console.log('🔥: A user disconnected');
    });
});

//Generate a random string
const fetchId = () => Math.random().toString(36).substring(2, 10);

let tasks = {
    pending: {
        title: "pending",
        items: [
            {
                id: fetchId(),
                title: "Send the design sample to Ben",
                comment: [],
            },
        ],
    },
        ongoing: {
            title: "ongoing",
            items: [
                {
                    id: fetchId(),
                    title: "Review Ben code on github",
                    comment: [
                        {
                            name: "BossMan",
                            text: "Ensure you proper review before merging the branches ",
                            id: fetchId(),
                        },
                    ],
                },

            ],
        },

        completed: {
            title: "complted",
            items: [
                {
                    title: "Review Ben code on github",
                    comment: [
                        {
                            id: fetchId(),
                            title: "Create Technical content",
                            comments: [
                                {
                                    name: "Tare",
                                    text: "Make sure you check the requirement",
                                    id: fetchId(),
                                },
                            ],
                          
                        },
                    ],
                },

            ],
        },
};

// Host the tasks object via the /api route
app.get("/api", (req, res) =>{
    res.json(tasks)
})


app.listen(PORT, () =>{
    console.log(`Server is listening at ${PORT}...`)
})