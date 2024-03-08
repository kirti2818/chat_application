"use client"
import { store } from "@/Store/store";
import { Provider } from "react-redux";

export default function StoreProvider ({children}){
    return <Provider store={store}>{children}</Provider>
}