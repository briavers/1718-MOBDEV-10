console.log('json is called in');

class getUrlVars {
  static vars () {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
      vars[key] = value;
    });
    return vars;
  }
}
/* function getUrlVars () {
  let vars = {};
  let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, (m, key, value) => {
    vars[key] = value;
  });
  return vars;
} */

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
    let blogData = data.articles;
    let projectsData = data.projects;

    console.log(blogData);
    let projectID = (getUrlVars.vars()['project'] - 1);
    console.log(projectID);
    let tempStr = '';
    let projectInfo = projectsData[projectID];
    let projectElement = document.querySelector('#artwork');
    let tag = '';
    if (projectInfo !== undefined && projectInfo !== null) {
      console.log(projectInfo);
      tag = projectInfo.tags[0];
    };
    let curentPage = window.location.href;
    if (projectInfo !== undefined && projectInfo !== null) {
      tempStr +=
      `
      <div class="fb-grid__row">
        <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
        <div class="fb-grid__col-xs-10 fb-grid__col-sm-10 fb-grid__col-md-10 fb-grid__col-lg-10 fb-grid__col-xl-10 fb-grid__col-10">
          <div class="picText">
            <img src="${projectInfo.pictures[0]}" alt="picture of the campus">
            <h4>  ${projectInfo.projectName}</h4>
            <h5 class="date"> <a href="./profileStudent.html?profile=${projectInfo.artist}"> ${projectInfo.artist} </a> </h5>
            <p>${projectInfo.bodyText}</p>
            <span class="tag tagArticle"><div class="fb-share-button" data-href="${curentPage}" data-layout="box_count" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2F${curentPage}%2F&amp;src=sdkpreparse">Delen</a></div></span>
            
          </div>
        </div>
        <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
      </div>`;
    };
    if (projectElement !== undefined && projectElement !== null) {
      projectElement.innerHTML = tempStr;
    };

    let blogElement = document.querySelector('#blog');
    // lege string aan maken
    let tempStr2 = '';

    let moreLikeThis = [];
    console.log(projectsData);
    if (projectInfo !== undefined && projectInfo !== null && projectsData !== undefined && projectsData !== null) {
      projectsData.forEach((projectsData) => {
        if (projectsData.tags[0] === tag && projectsData.projectName !== projectInfo.projectName || projectsData.tags[0] === projectInfo.tags[1] && projectsData.projectName !== projectInfo.projectName || projectsData.tags[1] === projectInfo.tags[0] && projectsData.projectName !== projectInfo.projectName) {
          moreLikeThis.push(projectsData);
        } else {
          console.log('nothing found');
        }
      });
    };

    class shuffleArray {
      static shuffle (array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        };
      };
    };

    /* function shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    } */

    shuffleArray.shuffle(moreLikeThis);

    let amounthToSplice = (moreLikeThis.length - 4);
    if (amounthToSplice < 4) {
      amounthToSplice = 0;
    }

    moreLikeThis.splice(4, amounthToSplice);
    console.log(moreLikeThis);
    if (moreLikeThis !== undefined && moreLikeThis !== null) {
      moreLikeThis.forEach((moreLikeThis) => {
        tempStr2 +=
          `<a href="./detailArtwork.html?project=${moreLikeThis.projectId}"> <div class="fb-grid__row margin-top blogSum">
              <div class="fb-grid__col-xs-3 fb-grid__col-sm-3 fb-grid__col-md-3 fb-grid__col-lg-3 fb-grid__col-xl-3 fb-grid__col-3">
                <img src="${moreLikeThis.pictures[0]}" alt="logo Portfolio rex" class="radius5"> </div>
                <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
                <div class="fb-grid__col-xs-6 fb-grid__col-sm-6 fb-grid__col-md-6 fb-grid__col-lg-6 fb-grid__col-xl-6 fb-grid__col-6">
                <h5 class="articleName">${moreLikeThis.projectName}</h5>
                <span class="date"> ${moreLikeThis.artist}<br> </span>
                <span class="tag tagArticle"> ${moreLikeThis.tags[0]}</span>
              </div>
            </div> </a>`;
      });
    };

    // de html in het element veranderen naar de inhoud van tempstr
    if (blogElement !== undefined && blogElement !== null) {
      blogElement.innerHTML = tempStr2;
    };

    if (moreLikeThis.length === 0) {
      let parent2 = document.querySelector('#parentArtwork');
      if (parent2 !== undefined && parent2 !== null) {
        console.log(parent2);
        let child2 = document.querySelector('#childArtwork');
        console.log(child2);
        parent2.removeChild(child2);
      };
    }
  },
  (status) => {
    console.log(status);
  }
);
/*
let projectID = getUrlVars()['project'];

const favoriteBtnElement = document.getElementById('favoriteBtn');

let logedIn = global.sessionStorage.getItem('logged-In');

if (logedIn) {
  let retrievedObject = global.localStorage.getItem('localStorageFavorites');

  let hopeObject = JSON.parse(retrievedObject);
  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  console.log('searching for the object now');

  let followingOldAray = hopeObject;
  console.log('followingOldAray ', followingOldAray);

  favoriteBtnElement.classList.remove('disabled');
  favoriteBtnElement.classList.add('active');

  let alreadyFollowing = followingOldAray.indexOf(projectID);
  console.log(alreadyFollowing);

  if (alreadyFollowing !== -1) {
    favoriteBtnElement.classList.remove('active');
    favoriteBtnElement.classList.add('following');
    favoriteBtnElement.innerHTML = `Following`;
  } else {
    favoriteBtnElement.addEventListener('click', function () {
      followingOldAray.push(projectID);
      global.localStorage.setItem('localStorageObject', JSON.stringify(followingOldAray));
    });
  }
}
*/
