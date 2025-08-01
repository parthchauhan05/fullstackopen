import mongoose from "mongoose"
const password = process.argv[2]

// const url = `mongodb+srv://admin:${password}@cluster0.svgtiff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: String
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Person', personSchema);