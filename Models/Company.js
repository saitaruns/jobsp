const {Schema,model} = require("mongoose")

const companySchema = Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    location:Schema.Types.ObjectId,
    startDate:Date,
    employees:Number,
    bio:{
        type:String,
        required:true,
    },
})

export default model("Company",companySchema)