const express = require('express');
const connectDB = require("./config/db")

const app = express();


connectDB()

app.get('/',(req, res)=> res.send('API RUNNING'));

//define routes
app.use('/api/user', require("./routes/api/users"));
app.use('/api/profile', require("./routes/api/profile"));
app.use('/api/auth', require("./routes/api/auth"));
app.use('/api/post', require("./routes/api/posts"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

