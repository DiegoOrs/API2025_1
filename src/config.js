import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "bml3zlg3uc1c5ed9egvl-mysql.services.clever-cloud.com"; 
export const BD_DATABASE = process.env.BD_DATABASE || "bml3zlg3uc1c5ed9egvl";
export const DB_USER = process.env.DB_USER || "ut2ihiym90sg7lch";
export const DB_PASSWORD = process.env.DB_PASSWORD || "oZJMe7iJwOZy4ED3yrP1";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;


