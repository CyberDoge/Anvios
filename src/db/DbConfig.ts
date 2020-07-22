import mongoose from "mongoose";

export function connectToDb() {
    const DATABASE = process.env.database;
    const uri = `mongodb://localhost:27017/${DATABASE}`;
    mongoose.connect(uri, {
        poolSize: 10,
        maxPoolSize: 100,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true
    });
    const db = mongoose.connection;
    db.on('error', (e) => {
        console.error('connection error:', e);
        process.exit(1);
    });
    db.once('open', () => {
        console.log("connected")
    });
}
