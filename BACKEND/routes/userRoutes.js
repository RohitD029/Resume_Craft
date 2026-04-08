const express = require('express')
const router = express.Router()

const {
    signup,
    login,
    updateProfile
} = require("../controllers/userControllers")

router.post("/signup",signup)
router.post("/login",login)
router.put("/updateProfile",updateProfile)

module.exports = router;
