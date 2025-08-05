const User = require("../model/userShema");
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { generateToken } = require("../token/generateToken");


exports.user_register = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: result.array()
        });
    }

    const { name, email, password } = req.body;


    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const userPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: userPassword
        })

        res.status(201).json({
            success: true,
            message: "user created sucessfully",

        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error on catch",
            message: error.message
        })
    }
}

exports.user_Login = async (req, res) => {

    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: result.array()
        })
    }

    const { email, password } = req.body;

    console.log(password);


    try {

        const user = await User.findOne({ email })

        console.log(user);


        if (!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        console.log(user.password);


        const ispasswordValid = await bcrypt.compare(password, user.password);


        if (!ispasswordValid) {
            res.status(400).json({
                success: false,
                message: "password is not valid"
            })
        }

        const log_Data = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }

        req.user = log_Data

        generateToken(req, res);

    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "error on server",
            message: error.message
        })
    }
}

exports.user_logout = async (req, res) => {
try {
     res.status(200).cookie("token", "").json({
        success: true,
        message: "logout successful",
        isauthenticated: false
    })
} catch (error) {
    res.status(500).json({
        success : false ,
        message : error.message
    })
}
   

}

exports.user_profile = async (req, res) => {
    const id = req.params.id
    const { name } = req.body

    if (!name) {
        res.status(400).json({
            success: false,
            message: "profile not edited"
        })
    }

    if (!id) {
        res.status(404).json({
            success: true,
            message: "profile not found"
        })
    }
    try {
        const userProfile = await User.findById(id)

        if (!userProfile) {
            res.status(404).json({
                success: false,
                message: "profile failed to fetch"
            })
        }

        userProfile.name = name;

        const updated_profile = await userProfile.save()

        console.log("updated_profile", updated_profile);



        res.status(200).json({
            success: true,
            message: "profile updated",
            updated_profile
        })



    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.user_Delete = async (req, res) => {
    const id = req.params.id

    console.log("id", id);

    if (!id && id.length === 0) {
        return res.status(400).json({
            success: false,
            message: "not found"
        })
    }
    try {
        const profile_delete = await User.findByIdAndDelete({ _id: id })

        console.log("");

        if (!profile_delete) {
            return res.status(400).json({
                success: false,
                message: "not found data"
            })
        }
        res.status(200).json({
            success: true,
            message: "profile has been deleted "
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

