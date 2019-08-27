/* @ngInject */
class IntroController {
  constructor($state) {
    this._$state = $state;
  }

  start() {
    this._$state.go('home');
  }
}

export { IntroController };
