const User = require("./../models/User")

//post method for auth
const signup =async(req,res)=>{
    try{
        const data = req.body
        const newuser = new User(data)
        const response = await newuser.save()
        console.log("User Auth data Saved")
        res.status(200).json(response);
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

// LOGIN
const login = async (req,res)=>{
    try{
        const {username,password} = req.body
        const user = await User.findOne({username})
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        if(user.password !== password){
            return res.status(401).json({message:"Invalid password"})
        }

        res.status(200).json({
            message:"Login successful",
            user:user
        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal server error'})
    }
}

// update profile
const updateProfile = async (req, res) => {
    try {
        const { userId, name, email, course, branch, year } = req.body;
        if (!userId) {
            return res.status(400).json({message: "User ID is required."});
        }
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        user.name = name !== undefined ? name : user.name;
        user.email = email !== undefined ? email : user.email;
        user.course = course !== undefined ? course : user.course;
        user.branch = branch !== undefined ? branch : user.branch;
        user.year = year !== undefined ? year : user.year;
        
        await user.save();
        res.status(200).json({message: "Profile updated successfully", user});
    } catch(err) {
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
}

module.exports = {signup,login,updateProfile}
