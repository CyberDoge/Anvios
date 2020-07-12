import mongoose from "mongoose";

export function connectToDb() {
    const DB_USERNAME = process.env.db_username;
    const DB_PASSWORD = process.env.db_password;
    const DATABASE = process.env.database || "anvios";
    const uri = `mongodb://localhost:27017/${DATABASE}`;
    mongoose.connect(uri, {poolSize: 10, maxPoolSize: 100, useNewUrlParser: true});
    const db = mongoose.connection;
    db.on('error', (e) => {
        console.error('connection error:', e);
        process.exit(1);
    });
    db.once('open', () => {
        console.log("connected")
    });
}
