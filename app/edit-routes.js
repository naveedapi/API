import PokeMon from "./model/pokemon-model";

function* addPokemon() {
  const pokemon = new PokeMon(this.request.body);
  try {
    pokemon.save();
    this.body = "Successfully created Pokemon";
  }catch(error) {
      console.log("error creating pokemon");
  }
};

function* updatePokemon() {
    //use the name of a pokemon to find the pokemon and update
    const pokemon = yield PokeMon.findOneAndUpdate({name: this.params.identifier}, this.request.body);
    if(pokemon){
        this.body = "Pokemon updated";
    } else {
        this.status = 404;
        this.body = "Sorry this pokemon was not found";
    }
    
}

function* deletePokemon() {
    const pokemon = yield PokeMon.findOneAndRemove({name: this.params.identifier});
    console.log(pokemon);
    if(pokemon) {
     this.body = "Successfully removed pokemon";
    } else {
        this.status = 404;
        this.body = "The pokemon you are trying to remove does not exist";
    }
}

export default { addPokemon, updatePokemon, deletePokemon }