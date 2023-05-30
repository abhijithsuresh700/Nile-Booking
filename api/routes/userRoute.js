import express from "express"
import { deleteUser, getAllUsers, getUser, updateUser } from "../controllers/userController.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";
const router = express.Router()

// router.get("/checkauth", verifyToken, (req,res)=>{
//     res.send("Hello user you are authenticated!");
// })

// router.get("/checkuserauth/:id", verifyUser, (req,res)=>{
//     res.send("Hello user you are logged in and authenticated!");
// })

// router.get("/checkadminauth/:id", verifyAdmin, (req,res)=>{
//     res.send("Hello admin you are logged in and authenticated!");
// })

router.put("/:id", verifyUser, updateUser)
router.delete("/:id",  deleteUser)
router.get("/:id", verifyUser, getUser)
router.get("/",  getAllUsers)
// router.post("/booking/:userId/:hotelId",  userBooking)

export default router