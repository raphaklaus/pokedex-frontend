/* @ngInject */
class ListController {
  constructor($http, $state, $stateParams) {
    this._$http = $http;
    this._$state = $state;
    this.pokemonNumber = $stateParams.id;
    this.loadingPokemonInfo = true;

    $http.get(`${process.env.API}/api/pokemon/${this.pokemonNumber}`).then(response => {
      this.loadingPokemonInfo = false;
      let info = {
        description: response.data.description,
        status: response.data.status,
        image: response.data.image
      };

      this.pokemon = {
        status: []
      };

      info.status.map(item => this.pokemon.status.push(`- ${item.statusName} - ${item.statusBase}`));
      this.pokemon.description = info.description;
      this.pokemon.image = info.image;
    });

    this.getComments();
  }

  postComment() {
    this._$http.post('${process.env.API}/api/comment', {
          user: this.user,
          text: this.text,
      pokemon: this.pokemonNumber }).then(response => {
      this.comments.push(response.data);
      this.user = '';
      this.text = '';
    });
  }

  getComments() {
    this._$http.get(`${process.env.API}/api/comments/${this.pokemonNumber}`)
      .then(response => {
        this.comments = response.data;
        this.loading = false;
      });
  }
}

export { ListController };
