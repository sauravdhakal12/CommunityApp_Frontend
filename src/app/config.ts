import "dotenv/config";

const e = process.env

export const BACKEND = e.URL;
export const BACKEND_USER = e.URL + "/user"
export const BACKEND_COMMUNITY = e.URL + "/community"