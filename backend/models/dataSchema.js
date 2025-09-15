import mongoose from "mongoose";

const dataSchema = new mongoose.Schema( {
    uuid :{
        type: String,   
        required: true,
    },
    fw : {
        type: String,
        required: true,
    },
    serverTimestamp: {
       type: Date, 
       default: Date.now
     },
    tts: {
        type: Number,
        required: true,
    },
    data : {
         temp: {
      type: Number,
      required: true
    },
    hum: {
      type: Number,
      required: true
    },
    pm : {
      type: Number,
      required: true
    }
    },

} )

const Data = mongoose.model("Data", dataSchema);
export default Data;