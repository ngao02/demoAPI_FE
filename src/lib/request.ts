import axios from "axios";
import { ENDPOINT_URL } from "./endpoint";
import https from 'https';


export const request = axios.create({
    baseURL:`${ENDPOINT_URL}/api/`,
    httpsAgent: new https.Agent({
        rejectUnauthorized: false, 
      }),
})