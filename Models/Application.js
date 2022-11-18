const {Schema,model} = require("mongoose")

const applicationSchema = Schema({
    appliedBy:{
        type: Schema.Types.ObjectId,
        required:true,
    },
    job:{
        type: Schema.Types.ObjectId,
        required:true,
    },
    cv:{
        type:String,
    }
})

module.exports = model("Application",applicationSchema)