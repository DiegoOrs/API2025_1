import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "bed0df3ncylkklauzmcs-mysql.services.clever-cloud.com"; 
export const BD_DATABASE = process.env.BD_DATABASE || "bed0df3ncylkklauzmcs";
export const DB_USER = process.env.DB_USER || "ufcxx4snikfo9hy4";
export const DB_PASSWORD = process.env.DB_PASSWORD || "j7nuvVvL7sP7Fhu5z4Cj";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;


