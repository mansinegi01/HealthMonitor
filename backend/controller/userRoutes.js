const userData = require('../model/user')
async function loginUser(req,res){
    const {email,password} = req.body;
    const findUser = await userData.findOne({email, password})
    if(!findUser){
        return res.status(404).json({message : "user not found"});
    }
    return res.status(200).json({
        user : {name : findUser.name, email : findUser.email}
    });
}


async function signupUser(req,res) {
    const {name,email,password} =  req.body;
    if(!name || !email || !password){
        return res.json("incomplete information");
    }
    try {
        await userData.create({
        name,
        email,
        password
        })

        return res.status(201).json({
           msg : "new entry created "
        })
    } catch (err) {
        return res.status(500).json({ error: "Database error", details: err.message });
    }
}

module.exports = {
    loginUser, signupUser
}