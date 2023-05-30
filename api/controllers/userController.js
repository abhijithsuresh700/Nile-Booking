import User from "../models/userModel.js";

export const updateUser = async(req,res,next)=>{
    try {
      const updateUser =  await User.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
      res.status(200).json(updateUser)
    } catch (error) {
        next(error);
    }
}

export const deleteUser = async(req,res,next)=>{
    console.log(req.params.id,"id check")
    try {
         await User.findByIdAndDelete(req.params.id)
      res.status(200).json("The User has been deleted")
    } catch (error) {
        next(error);
    }
}

export const getUser = async(req,res,next)=>{
    try {
        const user = await User.findById(req.params.id)
      res.status(200).json(user)
    } catch (error) {
        next(error);
    }
}

export const getAllUsers = async(req,res,next)=>{
    try {
        const users =  await User.find()
      res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}

// export const userBooking = async()=>{
//     console.log(req.params.userId,"userId")
//     console.log(req.params.hotelId,"hotelId")
//     console.log(req.params.roomId,"roomId")
//     try {
//         await User.findByIdAndUpdate(req.params.userId, {$addToSet: {bookings:{hotel:{hotelId:req.params.hotelId}}}})
//         res.status(200).json("Booking updated")
//     } catch (error) {
//         next(error);
//     }
// }