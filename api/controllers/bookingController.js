import Booking from "../models/bookingModel.js";
import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

export const bookRoom = async (req, res) => {
  console.log(req.body, "body check at booking");
  const newBooking = new Booking(req.body);
  try {
    const savedBooking = await newBooking.save();
    res.status(200).json(savedBooking);
    console.log(savedBooking, "saved booking");
  } catch (error) {
    next(error);
  }
};

export const userBookings = async (req, res, next) => {
  console.log(req.params.id, "params.id check at booking");
  try {
    const bookings = await Booking.find({user:req.params.id}).populate({
        path: "hotel",
        select: "name"
    }).exec();
     console.log(bookings, "my bookings");
    res.json(bookings)
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async(req,res,next)=>{
  console.log('getAllBookings')
  try {
      const bookings =  await Booking.find().populate({
        path: "hotel",
        select: "name"
    }).populate({
      path: "user",
      select: "name"
  }).exec();
    res.status(200).json(bookings)
  } catch (error) {
      next(error);
  }
}

export const updateStatus =async(req,res)=>{
  console.log("check444444",req.params.id)
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, {status: "Canceled"})
    console.log(booking,"status check")
    res.json("Booking has been canceled")
  } catch (error) {
    next(error);
  }
}