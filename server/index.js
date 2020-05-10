const express = require("express");
const moongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoute = require("./routes/auth");
const testRoute = require("./routes/test");

dotenv.config();

const app = express();
moongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("connected to database"));

app.use(express.json());

app.use("/api/user", authRoute);
app.use("/api/test", testRoute);

app.listen(8080, () => console.log("Server up and running"));