    // const userData = require('../model/user')
    // const {v4 : uuid} = require("uuid")
    // const {setUser} = require('../middlewares/auth')
    // async function loginUser(req,res){
    //     const {email,password} = req.body;
    //     const findUser = await userData.findOne({email, password})
    //     if(!findUser){
    //         return res.status(404).json({message : "user not found"});
    //     }

    //     const token = setUser(findUser);
    //     res.cookie("uid",token)
    //     return res.status(200).json({
    //         user : {name : findUser.name, email : findUser.email}
    //     });
    // }


    // async function signupUser(req,res) {
    //     const {email,password} =  req.body;
        
    //     if(!email || !password){
    //         return res.json("incomplete information");
    //     }
    //     try {
    //         await userData.create({
    //         email,
    //         password
    //         })

    //         return res.status(201).json({
    //            msg : "new entry created "
    //         })
    //     } catch (err) {
    //         return res.status(500).json({ error: "Database error", details: err.message });
    //     }
    // }

    // module.exports = {
    //     loginUser, signupUser
    // }
    const userData = require('../model/user');
    const { setUser } = require('../services/auth');

    //  LOGIN USER
    async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log("Login request received:", email, password);

  try {
    const findUser = await userData.findOne({ email, password });
    console.log("Found user:", findUser);

    if (!findUser) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = setUser(findUser);
    console.log("Generated token:", token);

    res.cookie("uid", token, { httpOnly: true, sameSite: "lax" });
    return res.status(200).json({
      message: "Login successful",
      user: { name: findUser.name, email: findUser.email },
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
}

    //  SIGNUP USER
    async function signupUser(req, res) {
    const { name, email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Incomplete information" });
    }

    try {
        const existingUser = await userData.findOne({ email });
        if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
        }

        const newUser = await userData.create({ name, email, password });

        // ✅ Generate JWT immediately after signup
        const token = setUser(newUser);

        res
        .status(201)
        .cookie("uid", token, {
            httpOnly: true,
            sameSite: "lax",
        })
        .json({
            message: "Signup successful",
            user: {
            name: newUser.name,
            email: newUser.email,
            },
            token, // 🔥 also send token here
        });

    } catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Database error", details: err.message });
    }
    }

    module.exports = { loginUser, signupUser };
