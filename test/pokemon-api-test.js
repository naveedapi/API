import {expect } from "chai";
import supertest from "supertest-as-promised";
import mongoose from "mongoose";
mongoose.Promise = Promise;
import bodyParser from "koa-bodyparser";

import App from "../server/app";
import PokeMon from "../app/model/pokemon-model";


let app = App();
app.use(bodyParser());
let request = supertest.agent(app.listen());


describe("Pokemon Api test", () => {
    
    before(() => {
        if(!mongoose.connection.readyState) {
            mongoose.connect("mongodb://localhost/test");
        }
    });
    
    after(() => {
        mongoose.disconnect();
    });
    
    beforeEach(async () => {
       await PokeMon.remove({});
       const pokemons = [{
           name: "test1",
           description: "desc test1"
       },{
          name: "test2",
          description: "desc test2"
       }, {
           name: "test3",
           description: "desc test3"
       }];
       await PokeMon.collection.insert(pokemons);
    });
    
    it("gets all pokemons", () => {
        return request.get("/api/pokemons")
                .expect(200)
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.body.length).to.equal(3);
                });
    });
    
    it("gets a single pokemon", () => {
        return request.get("/api/pokemons/test1")
                .expect(200)
                .expect("Content-Type", /json/)
                .then(res => {
                    expect(res.body.description).to.equal("desc test1");
                });
    });
    
    it("should return an error message if pokemon is not found", () => {
        return request.get("/api/pokemons/lost")
                .expect(404)
                .expect("Sorry pokemon not found");
                
    });
    
    
    it("should create new pokemon", () => {

        return request.post("/api/pokemons")
                .expect(200)
                .type('form')
                .send({name: "test4", description: "desc test4"})
                .set('Accept', /application\/json/)
                .expect("Successfully created Pokemon");
    });
    
    it("should update a pokemon", () => {
        return request.put("/api/pokemons/test2")
                .expect(200)
                .type("form")
                .send({description: "Change the test desc for this pokemon"})
                .set('Accept', /application\/json/)
                .expect("Pokemon updated");
    });
    
    it("should delete a pokemon", () => {
        return request.delete("/api/pokemons/test3")
                .expect(200)
                .type("form")
                .set('Accept', /application\/json/)
                .expect("Successfully removed pokemon");
    });
});