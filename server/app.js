import koa from "koa";
import mount from "koa-mount";
import forward from "koa-forward-request";

function App() {
    const app = koa();
    
    forward(app);
    //Make api calls with "/api" as default base
    //for example GET => /api/getbooks
    // app
    //     .use(mount("/api", Api()));
        
    return app;
        
}
export default App;