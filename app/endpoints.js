import koa from "koa";
import koaRouter from "koa-router";
import bodyParser from "koa-bodyparser";
import queryRoutes from "./query-routes";
import editRoutes from "./edit-routes";

const api = koa();
const router = koaRouter();

api.use(bodyParser());

router.get("/icons", queryRoutes.getIcons);
router.get("/public-pokemon", queryRoutes.getPokemonsFromPokiApi);
router.get("/pokemons", queryRoutes.getPokemons);
router.get("/pokemons/:identifier", queryRoutes.findOnePokemon);
router.post("/pokemons", editRoutes.addPokemon);
router.put("/pokemons/:identifier", editRoutes.updatePokemon);
router.delete("/pokemons/:identifier", editRoutes.deletePokemon);


api
    .use(router.routes())
    .use(router.allowedMethods());
    
    export default api;