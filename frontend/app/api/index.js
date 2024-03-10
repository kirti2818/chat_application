"use client";
import axios from "axios";

export const baseURL = "http://localhost:8080/api/";
// export const baseURL = "https://chat-application-gi09.onrender.com/api/"
export const clientUrl = "http://localhost:3000/";
// export const clientUrl = "https://chat-application-ruddy-five.vercel.app/"
import { getCookie } from "cookies-next";

let token;
export const Imageapi = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    token: token ? token : getCookie("chatToken"),
    "Content-Type": "multipart/formdata",
  },
});
const api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    token: token ? token : getCookie("chatToken"),
    "Content-Type": "application/json",
  },
});

export default api;
