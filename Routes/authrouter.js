const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const authroute = express.Router();

authroute.post("/login", async (req, res) => {
    // try {
    const { email, password } = req.body;

    if (!(email && password)) {
        return res.status(400).send("All inputs are required");
    }

    const exisitingUser = await User.findOne({ email });

    if (!exisitingUser) {
        return res.status(400).send("User not registered");
    }

    if (
        exisitingUser &&
        (await bcrypt.compare(password, exisitingUser.password))
    ) {
        const token = jwt.sign(
            { user_id: exisitingUser._id, email },
            process.env.TOKEN_KEY,
            { expiresIn: "1h" }
        );
        exisitingUser.token = token;
        return res.status(200).json({ user: exisitingUser, token });
    }
    return res.status(400).send("Invalid Credentials");
    // } catch (err) {
    //     return res.status(500).send("Something went wrong");
    // }
});

authroute.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!(name && email && password)) {
            return res.status(400).send("All inputs are required");
        }

        const exisitingUser = await User.findOne({ email });

        if (exisitingUser) {
            return res
                .status(403)
                .send("User with the same email already exists");
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        const token = jwt.sign(
            { user_id: newUser._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "1h",
            }
        );

        return res.status(200).json({
            user: newUser,
            token,
        });
    } catch (err) {
        return res.status(500).send("Something went wrong");
    }
});

module.exports = authroute;
