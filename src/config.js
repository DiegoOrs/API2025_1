import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "localhost"; 
export const BD_DATABASE = process.env.BD_DATABASE || "base2025";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;
export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || "dhttyci5g";
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "331911211558835";
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "pCcrliHs2YgPtar8-meIIxU0AT4";

