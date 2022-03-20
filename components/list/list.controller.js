/* @ngInject */
class ListController {
  constructor($http, $state, $stateParams) {
    this._$http = $http;
    this._$state = $state;
    this.pokemonNumber = $stateParams.id;
    this.loadingPokemonInfo = true;

    $http.get(`https://pokeapi.co/api/v2/pokemon/${this.pokemonNumber}`).then(response => {
      this.loadingPokemonInfo = false;
      let info = {
        description: response.data.description,
        image: response.data.sprites.front_default
      };

      this.pokemon = {
        status: []
      };

      this.pokemon.description = info.description;
      this.pokemon.image = info.image;
    });

    this.getComments();
  }

  postComment() {
    this.user = '';
    this.text = '';
  }

  getComments() {
    this.loading = false;
  }
}

export { ListController };
