import express from "express";
import { bookRoom, userBookings,getAllBookings ,updateStatus} from "../controllers/bookingController.js";
const router = express.Router();


router.post("/", bookRoom)
router.get("/:id", userBookings)
router.get("/", getAllBookings)
router.put("/:id",updateStatus)

export default router