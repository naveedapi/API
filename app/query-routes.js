import axios from "axios";
import PokeMon from "./model/pokemon-model";
//functions with the asterisks e.g function* means they are generator functions
//which allow you to use "yield" keywords
//yields are methods that will allow you data to be returned before it continues 
//execution of other code.
function* getIcons() { //sample
    //in koa js to send response back, you do that by assinging the response to this.body
    this.body ={
        author: "Test",
        status: "active"
    }
}

function* getPokemonsFromPokiApi() {
    const response = yield axios.get("http://pokeapi.co/api/v2/pokemon/");
    //after fecthing pokemons from public api
    //let's save the response to database
    const pokemons =  new PokeMon();
    pokemons.collection.insert(response.data.results);
    this.body = response.data;
};


function* getPokemons() {
    const pokemons = yield PokeMon.find().lean();
    this.body = pokemons;
};

//TODO: SET ENDPOINT 
function* findOnePokemon() {
    const pokemons = yield PokeMon.findOne({name: this.params.identifier});
    if(pokemons) {
        this.body = pokemons;
    } else {
        this.status = 404;
        this.body = "Sorry pokemon not found";
    }
};

export default {getIcons, getPokemons, getPokemonsFromPokiApi, findOnePokemon};