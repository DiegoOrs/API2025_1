import { createPool } from "mysql2/promise";
import {CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, BD_HOST, DB_USER, DB_PASSWORD, BD_DATABASE, DB_PORT,CLOUDINARY_CLOUD_NAME } from './config.js'
export const conmysql=createPool({
    host: BD_HOST,
    database: BD_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    CLOUDINARYNAME: CLOUDINARY_CLOUD_NAME,
    CLOUDINARYKEY: CLOUDINARY_API_KEY,
    CLOUDINARYSECRET: CLOUDINARY_API_SECRET
})