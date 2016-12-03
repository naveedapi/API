require("babel-polyfill");

//os lives in the computers file system as well as cluster
//meaning no need for npm install os or cluster
import os from "os";
//cluster helps you spin up a new process
//meaning incase you app crases, another server is spawn up immediately to keep your app alive 
import cluster from "cluster";
import App from "./app";
import mongoose from "mongoose";
mongoose.Promise = Promise;

import mongoConnectionString from "./mongo-connection-string";

function startMaster() {
    //WEB_CONCURRENCY is being used by heroku, it's an environment variable
    const workforce = process.env.WEB_CONCURRENCY || os.cpus().length;
    for(var i = 0; i < workforce;i++) {
        setTimeout(() => {
            cluster.fork();
        }, i * 1000);
    }
    
    console.info(`==> ✅  Server is listening in ${process.env.PORT } mode, with worker ${process.pid}`)
    cluster.on("exit", (worker) => {
        console.warn(`Worker ${worker.process.pid} died, forking a new worker`)
        cluster.fork();
    })
}


function startWorker() {
    mongoose.connect(mongoConnectionString);
    
    const app = App();
    const port = process.env.PORT || 3000;
    app.listen(port);
    
    console.info(`Server listening on port ${port}`);
    if(process.send) {
        process.send("online");
    }
}

if(cluster.isMaster && process.env.NODE_ENV !== "development") {
    startMaster();
} else {
    startWorker();
};