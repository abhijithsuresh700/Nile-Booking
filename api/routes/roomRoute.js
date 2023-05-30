import express from "express"
import { verifyAdmin } from "../utils/verifyToken.js";
import { createRoom, deleteRoom, getAllRoom, getRoom, updateRoom, updateRoomAvailability } from "../controllers/roomController.js";
const router = express.Router()

router.post("/:id",  createRoom)
router.put("/:id", verifyAdmin, updateRoom)
router.put("/availability/:id", updateRoomAvailability)
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom)
router.get("/:id", getRoom)
router.get("/", getAllRoom)

export default router