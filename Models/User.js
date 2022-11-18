const {Schema,model} = require("mongoose")

const userSchema = Schema({
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
    password:{
        type:String,
        required:true,
    },
    location:Schema.Types.ObjectId,
    age:{
        type:Number,
    },
    bio:{
        type:String,
    },
    skills:[{
        skill: Schema.Types.ObjectId,
        experience: Schema.Types.ObjectId,
    }],
    workExperience:[{
        company:String,
        startDate:Date,
        endDate:Date,
        desc:String,
        skills:Schema.Types.ObjectId
    }],
    education:[{
        institute:String,
        startDate:Date,
        endDate:Date,
        major:Schema.Types.ObjectId,
        grade:Number,
    }]
})

module.exports = model("User",userSchema)