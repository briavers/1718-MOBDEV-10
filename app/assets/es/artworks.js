console.log('json is called in');

class getJsonByCallbacks {
  static getJson (url, succesHandler, errorHandler) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', url, true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        const data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
        succesHandler && succesHandler(data);
      } else {
        errorHandler && errorHandler(`Error ${xhr.status}`);
      }
    };
    xhr.onerror = () => {
      errorHandler && errorHandler('network error');
    };
    xhr.send(null);
  }
}

getJsonByCallbacks.getJson('https://api.myjson.com/bins/1cqddv',
  (data) => {
    let projectsData = data.projects;
    console.log(projectsData);

    // Retrieve the object from storage
    let retrievedObject = global.localStorage.getItem('localStorageObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    console.log('searching for the object now');

    let followedProjects = [];
    let followedPeople = JSON.parse(retrievedObject);
    console.log(followedPeople);

    for (let i = 0; i < followedPeople.length; ++i) {
      console.info('inside the for loop');
      projectsData.forEach((projectsData) => {
        if (projectsData.artist === followedPeople[i]) {
          followedProjects.push(projectsData);
        } else {
          console.log('nothing found');
        }
      });
      console.log(followedProjects);
    }

    let followedWorksElement = document.querySelector('#followedArtworks');
    let curentPage = window.location.href;
    // lege string aan maken
    let tempStr = '';
    // The forEach() method executes a provided function once for each array element.
    followedProjects.forEach((projectsData) => {
    // projectsData.forEach(function(uitvoer) {
    // de tempstr aanvullen met de ingeladen informatie
      tempStr +=
          `<div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1 scroll"></div>
          <div class="fb-grid__col-xs-8 fb-grid__col-sm-8 fb-grid__col-md-8 fb-grid__col-lg-8 fb-grid__col-xl-8 fb-grid__col-8 scroll">
            <a href="./detailArtwork.html?project=${projectsData.projectId}">
              <div class="picText">
                <img src="${projectsData.pictures[0]}" alt="picture of the campus" class="height">
                <div class= "textHeight">
                    <h5>${projectsData.projectName}</h5>
                    <p>${projectsData.artist}</br>
                    ${projectsData.degree}</p>
                </div>
              </div>
            </a>
          </div>`;
    });

    if (followedWorksElement === null) {
      console.log('you found it');
    };
    // de html in het element veranderen naar de inhoud van tempstr
    if (followedWorksElement !== undefined && followedWorksElement !== null) {
      followedWorksElement.innerHTML = tempStr;
    };

    // console.log(projectsData);
    let projectovervieuw = document.querySelector('#allArtworks');


    /*
    // Retrieve the object from storage
    let retrievedArtworks = global.localStorage.getItem('localStorageFavorites');

    console.log('retrievedArtworks: ', JSON.parse(retrievedArtworks));

    console.log('searching for the object now');

    let favoriteArtworksArray = [];
    let followedArtworks = JSON.parse(retrievedArtworks);
    console.log(followedArtworks);
    if (followedArtworks !== null) {
      for (let j = 0; j < followedArtworks.length; ++j) {
        console.info('inside the for loop');
        projectsData.forEach((projectsData) => {
          if (projectsData.Id === followedArtworks[j]) {
            favoriteArtworksArray.push(projectsData);
          } else {
            console.log('nothing found');
          }
        });
        console.log(favoriteArtworksArray);
      }

      let followedArtWorksElement = document.querySelector('#followedArtworks');
      // lege string aan maken
      tempStr = '';
      // The forEach() method executes a provided function once for each array element.
      favoriteArtworksArray.forEach((projectsData) => {
        // projectsData.forEach(function(uitvoer) {
        // de tempstr aanvullen met de ingeladen informatie
        tempStr +=
          `<div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1 scroll"></div>
            <div class="fb-grid__col-xs-8 fb-grid__col-sm-8 fb-grid__col-md-8 fb-grid__col-lg-8 fb-grid__col-xl-8 fb-grid__col-8 scroll">
              <a href="./detailArtwork.html?project=${projectsData.projectId}">
                <div class="picText">
                  <img src="${projectsData.pictures[0]}" alt="picture of the campus" class="height">
                  <div class= "textHeight">
                      <h5>${projectsData.projectName}</h5>
                      <p>${projectsData.artist}</br>
                      ${projectsData.degree}</p>
                  </div>
                </div>
              </a>
            </div>`;
      });

      // de html in het element veranderen naar de inhoud van tempstr
      if (followedArtWorksElement !== undefined && followedArtWorksElement !== null) {
        followedArtWorksElement.innerHTML = tempStr;
      };
    }

    */
    // lege string aan maken
    let tempStr2 = '';

    // The forEach() method executes a provided function once for each array element.
    projectsData.forEach((projectsData) => {
    // projectsData.forEach(function(uitvoer) {
    // de tempstr aanvullen met de ingeladen informatie
      tempStr2 +=
          `<a href="./detailArtwork.html?project=${projectsData.projectId}">
          <div class="fb-grid__row margin-top blogSum">
            <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
            <div class="fb-grid__col-xs-3 fb-grid__col-sm-3 fb-grid__col-md-3 fb-grid__col-lg-3 fb-grid__col-xl-3 fb-grid__col-3">
              
              <img src="${projectsData.pictures[0]}" alt="logo Portfolio rex" class="radius5"> </div>
              <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
              <div class="fb-grid__col-xs-6 fb-grid__col-sm-6 fb-grid__col-md-6 fb-grid__col-lg-6 fb-grid__col-xl-6 fb-grid__col-6">
              <h5 class="articleName">${projectsData.projectName}</h5>
              <span class="date"> ${projectsData.artist}<br> </span>
              <span class="tag tagArticle ${projectsData.tags[0]}">${projectsData.tags[0]}</span>
              
            </div>
          </div></a>`;
    });

    // de html in het element veranderen naar de inhoud van tempstr
    console.log(projectsData.title);
    if (projectovervieuw !== undefined && projectovervieuw !== null) {
      projectovervieuw.innerHTML = tempStr2;
    };
  },
  (status) => {
    console.log(status);
  });

/* function getJsonByCallbacks (url, succesHandler, errorHandler) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', url, true);
  xhr.onload = () => {
    if (xhr.status === 200) {
      const data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
      succesHandler && succesHandler(data);
    } else {
      errorHandler && errorHandler(`Error ${xhr.status}`);
    }
  };
  xhr.onerror = () => {
    errorHandler && errorHandler('network error');
  };
  xhr.send(null);
} */

/* getJsonByCallbacks('https://api.myjson.com/bins/1cqddv',
  (data) => {
    let projectsData = data.projects;
    console.log(projectsData);

    // Retrieve the object from storage
    let retrievedObject = global.localStorage.getItem('localStorageObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));

    console.log('searching for the object now');

    let followedProjects = [];
    let followedPeople = JSON.parse(retrievedObject);
    console.log(followedPeople);

    for (let i = 0; i < followedPeople.length; ++i) {
      console.info('inside the for loop');
      projectsData.forEach((projectsData) => {
        if (projectsData.artist === followedPeople[i]) {
          followedProjects.push(projectsData);
        } else {
          console.log('nothing found');
        }
      });
      console.log(followedProjects);
    }

    let followedWorksElement = document.querySelector('#followedArtworks');
    let curentPage = window.location.href;
    // lege string aan maken
    let tempStr = '';
    // The forEach() method executes a provided function once for each array element.
    followedProjects.forEach((projectsData) => {
      // projectsData.forEach(function(uitvoer) {
      // de tempstr aanvullen met de ingeladen informatie
      tempStr +=
            `<div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1 scroll"></div>
            <div class="fb-grid__col-xs-8 fb-grid__col-sm-8 fb-grid__col-md-8 fb-grid__col-lg-8 fb-grid__col-xl-8 fb-grid__col-8 scroll">
              <a href="./detailArtwork.html?project=${projectsData.projectId}">
                <div class="picText">
                  <img src="${projectsData.pictures[0]}" alt="picture of the campus" class="height">
                  <div class= "textHeight">
                      <h5>${projectsData.projectName}</h5>
                      <p>${projectsData.artist}</br>
                      ${projectsData.degree}</p>
                  </div>
                </div>
              </a>
            </div>`;
    });

    // de html in het element veranderen naar de inhoud van tempstr
    if (followedWorksElement !== undefined && followedWorksElement !== null) {
      followedWorksElement.innerHTML = tempStr;
    };

    // console.log(projectsData);
    let projectovervieuw = document.querySelector('#allArtworks');

    // lege string aan maken
    let tempStr2 = '';

    // The forEach() method executes a provided function once for each array element.
    projectsData.forEach((projectsData) => {
      // projectsData.forEach(function(uitvoer) {
      // de tempstr aanvullen met de ingeladen informatie
      tempStr2 +=
            `<a href="./detailArtwork.html?project=${projectsData.projectId}">
            <div class="fb-grid__row margin-top blogSum">
              <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
              <div class="fb-grid__col-xs-3 fb-grid__col-sm-3 fb-grid__col-md-3 fb-grid__col-lg-3 fb-grid__col-xl-3 fb-grid__col-3">
                <img src="${projectsData.pictures[0]}" alt="logo Portfolio rex" class="radius5"> </div>
                <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
                <div class="fb-grid__col-xs-6 fb-grid__col-sm-6 fb-grid__col-md-6 fb-grid__col-lg-6 fb-grid__col-xl-6 fb-grid__col-6">
                <h5 class="articleName">${projectsData.projectName}</h5>
                <span class="date"> ${projectsData.artist}<br> </span>
                <span class="tag tagArticle ${projectsData.tags[0]}">${projectsData.tags[0]}</span>
              </div>
            </div></a>`;
    });

    // de html in het element veranderen naar de inhoud van tempstr
    console.log(projectsData.title);
    if (projectovervieuw !== undefined && projectovervieuw !== null) {
      projectovervieuw.innerHTML = tempStr2;
    };
  },
  (status) => {
    console.log(status);
  }
); */
