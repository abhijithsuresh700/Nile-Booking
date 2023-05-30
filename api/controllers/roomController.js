import Room from "../models/roomModel.js";
import Hotel from "../models/hotelModel.js";


export const createRoom = async(req,res,next)=>{
    const hotelId = req.params.id;
    const newRoom = new Room(req.body)
    try {
        const savedRoom = await newRoom.save();
        try {
           await Hotel.findByIdAndUpdate(hotelId, {$push : {rooms: savedRoom._id}})
        } catch (error) {
            next(error)
        }
        res.status(200).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

export const updateRoom = async(req,res,next)=>{
    try {
      const updateRoom =  await Room.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
      res.status(200).json(updateRoom)
    } catch (error) {
        next(error);
    }
}

export const updateRoomAvailability = async(req,res,next)=>{
  console.log(req.body.dates,"dates check")
    console.log(req.params.id,"id check at room update")
    try {
        await Room.updateOne(
          { "roomNumbers._id": req.params.id },
          {
            $push: {
              "roomNumbers.$.unavailableDates": req.body.dates
            },
          }
        );
        res.status(200).json("Room status has been updated.");
      } catch (err) {
        next(err);
      }
}

export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelId;
    try {
         await Room.findByIdAndDelete(req.params.id)
         try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull : {rooms: req.params.id}})
         } catch (error) {
             next(error)
         }
      res.status(200).json("The Room has been deleted")
    } catch (error) {
        next(error);
    }
}

export const getRoom = async(req,res,next)=>{
    try {
        const room = await Room.findById(req.params.id)
      res.status(200).json(room)
    } catch (error) {
        next(error);
    }
}

export const getAllRoom = async(req,res,next)=>{
    try {
        const room =  await Room.find()
      res.status(200).json(room)
    } catch (error) {
        next(error);
    }
}