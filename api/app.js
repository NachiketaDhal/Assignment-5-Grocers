require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const productRoute = require("./routes/product.route");
const cartRoute = require("./routes/cart.route");
const favRoute = require("./routes/fav.route");
const authRoute = require("./routes/auth.route");

const app = express();

const port = 8000 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello, from grocers API");
});

app.use("/api", productRoute);
app.use("/api", cartRoute);
app.use("/api", favRoute);
app.use("/api", authRoute);

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("DB CONNECTED 🔥"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log(`Server running at port ${port}...`));
