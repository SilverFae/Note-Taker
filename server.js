const express = require("express");
const htmlRoutes = require("./routes/html-routes");
const apiRoutes = require("./routes/api-routes");

const PORT = process.env.PORT || 3001;

const app = express();

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`The server is currently running on http://localhost:${PORT}`);
});
