import mongoose from 'mongoose';

const connectDB = async () => {
   try{const conn = await mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        //useCreateIndex:true,
        useUnifiedTopology: true
    })
    console.log(`MongoDB Connected : ${conn.connect.host}`.cyan.underline);
}catch(err){
    console.error(`Error : ${err.message}`.red.underline.bold);
    process.exit(1);
}

    
}

export default connectDB;