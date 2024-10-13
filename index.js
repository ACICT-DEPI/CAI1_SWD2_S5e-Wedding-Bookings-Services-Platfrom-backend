const express = require('express')
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route.js');
const serviceRoute = require('./routes/service.route.js');
const categoryRoute = require('./routes/category.route.js');
const bookingRoute = require('./routes/booking.route.js');
const uploadRoute = require('./routes/upload.route.js');
const bodyParser = require('body-parser');


const app = express()


//middleware
app.use(express.json());


app.use(bodyParser.json()); // Correctly using body-parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });



//routes
app.use('/api/users', userRoute);

app.use('/api/services', serviceRoute);

app.use('/api/categories', categoryRoute);

app.use('/api/bookings', bookingRoute);


app.use('/api/upload', uploadRoute);



app.get('/', (req, res) => {
    res.send("Hello from node API Server Maram");
});




mongoose.connect("mongodb+srv://wmaram158:wmaram158@mernproject.gncls.mongodb.net/Node-API?retryWrites=true&w=majority&appName=MernProject")
.then(() => {
    console.log("Connected to database!");
    app.listen(8000, () => {
        console.log('server is running on port 8000');
    });
    
})
.catch(() => {
    console.log("Connection failed!");
});


