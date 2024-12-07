const express = require("express");
const mainRouter = require('./routes/index');
const port = 3000;
const cors = require('cors');
const app = express();
app.use(cors());
app.use('/api/v1',mainRouter);


app.listen(port,()=>{
    console.log('server is running ',port);
})