const app = require('./src/app')
const PORT = 3000
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// handle on closing server
process.on('SIGINT', () => {
    console.log('Server is closing...')
    server.close(() => {
        console.log('Server closed')
        process.exit(0)
    })
})