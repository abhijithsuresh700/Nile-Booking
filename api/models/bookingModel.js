import mongoose from 'mongoose';
import User from './userModel.js';
import Hotel from "./hotelModel.js";
import Room from "./roomModel.js";
const { Schema } = mongoose;

const BookingSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', 
        required: true,
      },
      room: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room', 
        required: true,
      }],
      startDate:{
        type: Date,
        required: true,
      },
      endDate:{
        type: Date,
        required: true,
      },
      status:{
        type: String,
        default:"active"
      }

},{timestamps: true});

export default mongoose.model("Booking", BookingSchema)