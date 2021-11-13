const app = require('./app');

const { PORT = 9090 } = process.env;

app.listen(3000, (err) => {
  if (err) throw err;
  console.log(`Server Started. Listening on ${PORT}`);
});
