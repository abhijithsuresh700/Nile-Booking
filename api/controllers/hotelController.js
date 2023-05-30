import Hotel from "../models/hotelModel.js";
import Room from "../models/roomModel.js";

export const createHotel = async(req,res,next)=>{
  console.log(req.body,"body check for hotel")
    const newHotel = new Hotel(req.body)
    try {
      const savedHotel =  await newHotel.save();
      console.log(savedHotel)
      res.status(200).json(savedHotel)
    } catch (error) {
        next(error);
    }
}

export const updateHotel = async(req,res,next)=>{
    try {
      const updateHotel =  await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body},{new:true})
      res.status(200).json(updateHotel)
    } catch (error) {
        next(error);
    }
}

export const deleteHotel = async(req,res,next)=>{
    try {
         await Hotel.findByIdAndDelete(req.params.id)
      res.status(200).json("The hotel has been deleted")
    } catch (error) {
        next(error);
    }
}

export const getHotel = async(req,res,next)=>{
    try {
        const hotel = await Hotel.findById(req.params.id)
      res.status(200).json(hotel)
    } catch (error) {
        next(error);
    }
}

export const getAllHotel = async (req, res,next) => {
    console.log(req.query,"query check")
    const {min,max,city, ...others} = req.query;
    try {
        const hotels = await Hotel.find({...others,city:{$regex:new RegExp(city,'i')},cheapestPrice:{$gt:min|1,$lt:max||99999}});
        console.log(hotels,"hotels check at getall hotels")
            res.status(200).json(hotels)
    } catch (error) {
        next(error);
    }
}

export const countByCity = async(req,res,next)=>{
    const cities = req.query.cities.split(',')
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city: city})
        }))
      res.status(200).json(list)
    } catch (error) {
        next(error);
    }
}

export const countByType = async(req,res,next)=>{
    try {
        const hotelCount = await Hotel.countDocuments({type: "hotel"})
        const apartmentCount = await Hotel.countDocuments({type: "apartment"})
        const resortCount = await Hotel.countDocuments({type: "resort"})
        const villaCount = await Hotel.countDocuments({type: "villa"})
        const cabinCount = await Hotel.countDocuments({type: "cabin"})
      res.status(200).json([
        {type: "hotel", count: hotelCount},
        {type: "apartment", count: apartmentCount},
        {type: "resort", count: resortCount},
        {type: "villa", count: villaCount},
        {type: "cabin", count: cabinCount},
      ]);
    } catch (error) {
        next(error);
    }
}

export const getHotelRooms = async (req, res, next) => {
  console.log(req.params.id,"getHotelRooms checkkk")
  try {
    const hotel = await Hotel.findById(req.params.id);
    console.log(hotel,"hotel checkkk")
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    console.log(list,"list checkkkk")
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
};