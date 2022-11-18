const {Schema,model} = require("mongoose")

const locationSchema = Schema({
    name:String,
})

module.exports = model("Location",locationSchema)