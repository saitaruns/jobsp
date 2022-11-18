const {Schema,model} = require("mongoose")

const jobSchema = Schema({
    title:{
        type:String,
        required:true,
    },
    description: {
        type: String,
        required: true,
    },
    skills:[{
        skill:Schema.Types.ObjectId,
        exp:{
            type:Number,
            default:0
        },
    }],
    location:[{
        type:Schema.Types.ObjectId,
        ref:"Location",
        required:true
    }],
    benifits: String,
    numOfApp: {
        type: Number,
        default:0
    },
    createdAt: {
        type:Date,
        default : () => Date.now()
    },
    openUntil:{
        type:Number,
        required:true
    },
    postedby:{
        type:Schema.Types.ObjectId,
        ref:"Company"
    },
    appliedBy:[Schema.Types.ObjectId]
});

module.exports = model("Job", jobSchema);
