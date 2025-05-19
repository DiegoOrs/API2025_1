import { config } from 'dotenv'
config()

export const BD_HOST = process.env.BD_HOST || "b3ejsyi90q2fonm30tcd-mysql.services.clever-cloud.com"; 
export const BD_DATABASE = process.env.BD_DATABASE || "b3ejsyi90q2fonm30tcd";
export const DB_USER = process.env.DB_USER || "uea3jegxnofeonjd";
export const DB_PASSWORD = process.env.DB_PASSWORD || "dxfYiV1vezs84F4AafDF";
export const DB_PORT = process.env.DB_PORT || 3306;
export const PORT = process.env.PORT || 3000;
