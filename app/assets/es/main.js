'use strict';
'use strict';

import { Person, Student } from './models';
// import { Alert } from './custom.js';

class App {
  constructor () {
    console.log('Constructor of the class');
  }

  init () {
    console.log('Initialization of the class App');

    const ps1 = new Person('Philippe', 'De Pauw - Waterschoot');
    console.log(ps1.toString());

    const st1 = new Student('362453', 'philippe.depauw@arteveldehs.be', 'Philippe', 'De Pauw - Waterschoot');
    console.log(st1.toString());
  }
};

window.addEventListener('load', (ev) => {
  const app = new App();
  app.init();
});

let menubutton = document.getElementById('menubutton');
let menuShow = false;
menubutton.addEventListener('click', function myMasterMenuShow () {
  function myFunction () {
    if (menuShow) {
      menuShow = false;
    } else {
      menuShow = true;
    }
    menuShowing();
  }

  myFunction();

  function menuShowing () {
    if (menuShow) {
      console.log('showing menu');
      document.getElementById('menu').style.display = 'block';
      document.getElementById('page').style.display = 'none';
      document.getElementById('menubutton').classList.add('change');
    } else {
      console.log('showing NOO menu');
      document.getElementById('menu').style.display = 'none';
      document.getElementById('page').style.display = 'block';
      document.getElementById('menubutton').classList.remove('change');
    }
  }
});

let logOutBtnElement = document.querySelector('#logOutBtn');
logOutBtnElement.addEventListener('click', function logout () {
  global.sessionStorage.clear();
  console.log('session removed');
  window.location.href = './index.html';
});
