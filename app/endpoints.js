import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "./query-routes";

const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.get("/icons", queryRoutes.getIcons);


api
    .use(router.routes())
    .use(router.allowedMethods());
    
    export default api;