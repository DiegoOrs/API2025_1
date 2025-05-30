import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "b92tvgvyucypcfzbwvx0-mysql.services.clever-cloud.com"; 
export const BD_DATABASE = process.env.BD_DATABASE || "b92tvgvyucypcfzbwvx0";
export const DB_USER = process.env.DB_USER || "updi8olpmugcnwlx";
export const DB_PASSWORD = process.env.DB_PASSWORD || "66uXKU71K6CuPQReqTNh";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;


