import mongoose from "mongoose";

export const EVENT_STATUSES = [
    "init","inProgress","accepted","firstPay","completed","cancelled","archived"
];

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim:true,
    },
    note:{
        type: String,
        required:true,
    },
    date: {
        type: Date,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
        index:true
    },
    status: {
        type: String,
        enum: EVENT_STATUSES,
        default:"init",
        index:true,
    },
    isDeleted: {
         type: Boolean,
         default: false,
         index: true 
    },
    deletedAt: {
         type: Date,
         default: null,
    },
    firstPay:{
        type: Boolean,
        default:false,
    },
    secondPay:{
        type: Boolean,
        default:false,
    }
},
{
    timestamps: true,   
})



export default mongoose.model("Event",eventSchema);