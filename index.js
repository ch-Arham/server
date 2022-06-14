const connectToMongo = require('./db');
const express = require('express');
const app = express();
const cors = require('cors')

const dotenv = require("dotenv");
dotenv.config({ path: "server/.env" });

const auth = require('./routes/auth');
const notification = require('./routes/notification');
const video = require('./routes/video');
const banner = require('./routes/banner');
const bugbounty = require('./routes/bugbounty');
const marketing = require('./routes/marketing');
const marketingadmin = require('./routes/marketingadmin');

const marketinghl = require('./routes/marketinghl');


const lotteryDay = require('./routes/lotteryDay');


connectToMongo();

//parse json to body
app.use(express.json());
 
app.use(cors())


//Available Routes

app.get('/',(req,res)=>{
  res.send('Hello World')
})
app.use('/api/auth', auth);
app.use('/api/notification', notification);
app.use('/api/video', video)
app.use('/api/bugbounty', bugbounty);
app.use('/api/marketing', marketing)
app.use('/api/marketingadmin', marketingadmin)
app.use('/api/banner', banner)
app.use('/api/lotteryDay', lotteryDay)

app.use('/api/marketinghl', marketinghl)


app.listen(process.env.PORT, () => {
    console.log("Listening to port:5000....");
  });


