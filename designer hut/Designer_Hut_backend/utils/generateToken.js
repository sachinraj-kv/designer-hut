const jwt = require('jsonwebtoken');

exports.generateToken = async (req, res) => {

    console.log("login data", req.user);

    console.log("req.user",req.user);
    

    const payload = {
        id: req.user.id,
        time: Date.now(),
        role: req.user.role
    }
    const jwt_token = await jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h'});

    if (!jwt_token) {
        return res.status(500).json({
            success: false,
            message: "error in generating token"
        })
    }

   res.cookie("token", jwt_token, {
        httpOnly: true,       
        secure: true,        
        sameSite: "none",     
        maxAge: 60 * 60 * 1000 
    });

    res.status(200).json({
        success: true,
        message: "login successful",
        token: jwt_token,   
        isauthenticated: true,
        user: {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            role: req.user.role
        }
    })
}