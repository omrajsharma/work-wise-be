const UserModel = require('../model/UserModel');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{7,29}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const registerUser = async (req, res) => {
    const { name, phone, email, username, password } = req.body;

    if (name.length < 2 || name.length > 30) {
        res.status(400).json({error: 'name length should be greater than 1 and less than equals to 30 characters'})
        return
    }
    if (phone.length < 10 || phone.length > 10) {
        res.status(400).json({error: 'Invalid Phone Number'})
        return
    }
    if (!emailRegex.test(email)) {
        res.status(400).json({error: 'Invalid Email'})
        return
    }
    if (!usernameRegex.test(username)) {
        res.status(400).json({error: 'Invaid username! It should have only a-z A-Z 0-9 _ characters and should have 8-30 characters'})
        return
    }
    if (!passwordRegex.test(password)) {
        res.status(400).json({error: 'Invalid Password! Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'})
        return
    }

    try {
        const userByUsername = await UserModel.findOne({username: username});
        if (userByUsername) {
            res.status(400).json({error: 'Username Already Exists'});
            return;
        }
        const userByEmail = await UserModel.findOne({email: email});
        if (userByEmail) {
            res.status(400).json({error: 'Email Already Exists'})
            return;
        }

        const userDoc = await UserModel.create({
            name,
            phone,
            email,
            username,
            password: bcrypt.hashSync(password, salt)
        });
        res.status(201).json(userDoc);
    } catch (err) {
        res.status(500).json({ error: "Server Error" })
    }
}

module.exports = { registerUser };