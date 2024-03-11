"use client";
import axios from "axios";
import { getCookie } from "cookies-next";

export const baseURL = "http://localhost:8080/api/";
// export const baseURL = "https://chat-application-gi09.onrender.com/api/"
export const clientUrl = "http://localhost:3000/";
// export const clientUrl = "https://chat-application-ruddy-five.vercel.app/"


let token;
export const Imageapi = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    token: token ? token : getCookie("chat_token"),
    "Content-Type": "multipart/formdata",
  },
});
const api = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    token: token ? token : getCookie("chat_token"),
    "Content-Type": "application/json",
  },
});

export default api;
