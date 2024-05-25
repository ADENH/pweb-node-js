const Mongoose = require("mongoose")
const localDB = 'mongodb+srv://pweb-user:SIo35bkh2XS1BINw@cluster0.bzfp52o.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  //adenurhidayat101294
  //1Ma5X847HbejVS7s
const connectDB = async () => {
  await Mongoose.connect(localDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  console.log("MongoDB Connected")
}
module.exports = connectDB