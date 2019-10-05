import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;

const fundingSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    donatedAmount : {
        type: Number,
        default : 0
    },
    postedBy : {
        type: ObjectId,
        ref: "User"
    },
    created : {
        type: Date,
        default: Date.now
    }
});
const fundingModel = mongoose.model('Funding', fundingSchema);

export default fundingModel;