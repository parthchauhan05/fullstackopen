import mongoose from 'mongoose'

// const url = `mongodb+srv://admin:${password}@cluster0.svgtiff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url = process.env.MONGODB_URI
mongoose.set('strictQuery',false)

mongoose.connect(url)
  .then(() => {
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
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: function (item) {
      return /^\d{2,3}-\d+$/.test(item)
    },
    message: (props) => `${props.value} is not a valid phone number.`
  }
})
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export default mongoose.model('Person', personSchema)