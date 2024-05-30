express = require('express');
const cors = require("cors");

const articleRouter = require('./routes/article.routes');
const articleImageRouter = require('./routes/articleImage.routes');
const cartRouter = require('./routes/cart.routes');
const categoryRouter = require('./routes/category.routes');
const dataRouter = require('./routes/dataSave.routes');
const feedbackRouter = require('./routes/feedback.routes');
const orderRouter = require('./routes/order.routes');
const orderedArticleRouter = require ('./routes/orderedArticle.routes');
const paymentRouter = require ('./routes/payment.routes');
const paymentDataRouter = require('./routes/paymentData.routes');
const userRouter = require('./routes/user.routes');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  }));


app.get('api/download', function(req, res){
  const file = `${__dirname}/upload-folder/myFile.xlsx`;
  res.download(file); // Set disposition and send it.
});
app.use('/api', articleRouter);
app.use('/api', articleImageRouter);
app.use('/api', cartRouter);
app.use('/api', categoryRouter);
app.use('/api', dataRouter);
app.use('/api', feedbackRouter);
app.use('/api', orderRouter);
app.use('/api', orderedArticleRouter);
app.use('/api', paymentDataRouter);
app.use('/api', paymentRouter);
app.use('/api', userRouter);


app.listen(PORT, () => console.log(`Server is working on PORT ${PORT}`));

const delay = ms => {
  return new Promise(r => setTimeout(() => r(), ms))
}

const url1 = 'http://localhost:3001/api/data/'    // getArticlePercentageIncome
const url2 = 'http://localhost:3001/api/data/payment/?date_length=year'    // getArticlePercentageIncome
const url3 = 'http://localhost:3001/api/data/user/?date_length=year'    // getNewCustomers   
const url4 = 'http://localhost:3001/api/data/article-income/?article_id=3'    // getArticlePercentageIncome
const url5 = 'http://localhost:3001/api//data/article/?less_than=4'    // getArticlePercentageIncome

// function fetchTodos(params) {
//   console.log('Fetch todo started...')
//   return delay(2000)
//   .then(() => fetch(url3))
//   .then(response => response.json())
// };

// fetchTodos()
//   .then(data => {
//       console.log('Data:', data)
//   })
//   .catch(e => console.error(e))