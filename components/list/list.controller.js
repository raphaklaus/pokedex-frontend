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

      this.pokemon.description = info.description || "Description not available";
      this.pokemon.image = info.image;
    });

    this.comments = this.getComments();
  }

  postComment() {
    var comments = this.getComments()
    var comment = {user: this.user, text: this.text}
    comments.push(comment)
    this.comments = comments
    localStorage.setItem(`comments_${this.pokemonNumber}`, JSON.stringify(comments))
  }

  getComments() {
    return JSON.parse(localStorage.getItem(`comments_${this.pokemonNumber}`) || "[]")
  }
}

export { ListController };
