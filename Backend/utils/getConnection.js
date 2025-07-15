const mongoose=require('mongoose')
const getConnection=()=>{
    try{
      mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log('DB is Connected')
      }).catch(()=>{
        console.log('failed to Connect to DB')
      })
    }catch(error){
        console.log(error.message)
    }
}

module.exports=getConnection