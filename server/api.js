import mount from "koa-mount";
import koa from "koa";
import apiEndpoints from "../app/endpoints";

export default function Api() {
    const api = koa();
    
    
    api.use(mount("/", apiEndpoints));
    api.use(function *terminator() {
        return; //to stop continuing past api requst to other request handlers like frontend
    });
    return api;
}