require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(process.env.MONGO_URI, () =>
    console.log("Connected to Mongodb Atlas")
);

const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

const authrouter = require("./Routes/authrouter");
app.use("/auth", authrouter);

app.use(require("./authverify"));
const jobrouter = require("./Routes/jobrouter");
app.use("/jobs", jobrouter);

app.get("/", (req, res) => {
    return res.send("Hi");
});

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});
