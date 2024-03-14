import dotenv from "dotenv";

dotenv.config();

export default  {
    host: process.env.HOST || "localhost",
    database: process.env.DATABASE || "sgtickets",
    user: process.env.USER || "root",
    password: process.env.PASSWORD || ""
};
