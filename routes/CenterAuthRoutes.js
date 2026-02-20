// routes/CenterAuthRoutes.js
const express = require("express");
const { signup, login, allUsers, singleUser ,} = require("../controllers/centerAuthController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);


router.get("/all-users", allUsers);     // ✅ list all users
router.get("/user/:userId", singleUser); // ✅ get single user by id


module.exports = router;
