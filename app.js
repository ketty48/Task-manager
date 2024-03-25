const connectDB=require('./db/connect')
const express = require('express');
const app = express()
const tasks = require('./routers/task');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
require('dotenv').config()
app.use(express.static( './public'))
app.use(express.json())


app.get('/hello',(req,res)=>{
    res.send('Task Manager App')
})
app.use('/api/v1/tasks', tasks)
app.use(notFound);
app.use(errorHandlerMiddleware);

const port =process.env.PORT || 3000;
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
  
