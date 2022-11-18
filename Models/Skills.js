const {Schema,model} = require("mongoose")

const skillSchema = Schema({
    name:String,
})

module.exports = model("Skill",skillSchema)