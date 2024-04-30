const app = require('./src/app');
require('dotenv').config();
const PORT = process.env.PORT || 3002;
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// handle on closing server
process.on('SIGINT', () => {
    console.log('Server is closing...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    })
})