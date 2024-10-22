const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;
// Configure CORS options
// const corsOptions = {
//     origin: 'http://rnoep-92-34-244-149.a.free.pinggy.link', // Allow only this origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
//     credentials: true, // Allow cookies if needed
// };
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json()); // For parsing application/json

const routes = require('./routes')
// Middleware to parse JSON requests
//app.use(express.json());

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});


// app.get('/api/v1/auth/signin', (req, res) => {
//     res.send('Hello,signin for you!');
// });

app.use("/api", routes);
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);

});
