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
    
}

function* deletePokemon() {
    
}
export default { addPokemon, updatePokemon, deletePokemon }