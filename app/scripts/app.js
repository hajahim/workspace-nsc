import { Instance } from './components/_template.js';

export class Main {

  constructor () {
    console.log(Instance);
  }

}

document.addEventListener('DOMContentLoaded', () => new Main());
