import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    img:{
        type: String,
    },
    city:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    bookings:{
        hotel:{
            hotelId:String,
        }
    }
},{timestamps: true});

export default mongoose.model("User", UserSchema)