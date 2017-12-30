function getUrlVars () {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}

let profileID = getUrlVars()['profile'];
let student = profileID.replace(/%20/g, ' ');
console.log('Student ', student);

function getJsonByCallbacks (url, succesHandler, errorHandler) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = (!xhr.responseType) ? JSON.parse(xhr.response) : xhr.response;
      succesHandler && succesHandler(data);
    } else {
      errorHandler && errorHandler(`Error ${xhr.status}`);
    }
  };
  xhr.onerror = function () {
    errorHandler && errorHandler('network error');
  };
  xhr.send(null);
}

getJsonByCallbacks('https://api.myjson.com/bins/1cqddv',
  function (data) {
    let projectsData = data.projects;
    console.log('project data ', projectsData);

    console.log('project id ', profileID);

    let allWorksByStudent = [];

    projectsData.forEach(function (projectsData) {
      if (projectsData.artist === student) {
        console.log('found a match');
        allWorksByStudent.push(projectsData);
      }
    });

    console.log(allWorksByStudent);

    let projectElement = document.querySelector('#artwork');
    let tempStr = '';
    tempStr +=
        `
      <div class="fb-grid__row">
        <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
        <div class="fb-grid__col-xs-10 fb-grid__col-sm-10 fb-grid__col-md-10 fb-grid__col-lg-10 fb-grid__col-xl-10 fb-grid__col-10">
          <div class="picText">
            <img src="${allWorksByStudent[0].pictures[0]}" alt="picture of the campusfirst work of student"></img>
            <h4>  ${allWorksByStudent[0].artist} </h4>
            <h5 class="date"> personal information </h5>
            <p>${allWorksByStudent[0].bodyText}</p>
          </div>
        </div>
        <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
      </div>`;

    if (projectElement !== undefined && projectElement !== null) {
      projectElement.innerHTML = tempStr;
    };

    let tempStr2 = '';
    for (let i = 1; i < allWorksByStudent.length; ++i) {
      tempStr2 +=
        `<a href="./detailArtwork.html?project=${allWorksByStudent[i].projectId}"> <div class="fb-grid__row margin-top blogSum">
              <div class="fb-grid__col-xs-3 fb-grid__col-sm-3 fb-grid__col-md-3 fb-grid__col-lg-3 fb-grid__col-xl-3 fb-grid__col-3">
                <img src="${allWorksByStudent[i].pictures[0]}" alt="logo Portfolio rex" class="radius5"> </div>
                <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
                <div class="fb-grid__col-xs-6 fb-grid__col-sm-6 fb-grid__col-md-6 fb-grid__col-lg-6 fb-grid__col-xl-6 fb-grid__col-6">
                <h5 class="articleName">${allWorksByStudent[i].projectName}</h5>
                <span class="date"> ${allWorksByStudent[i].artist}<br> </span>
                <span class="tag tagArticle"> ${allWorksByStudent[i].tags[0]}</span>
              </div>
            </div> </a>`;
    }
    let otherWorksElement = document.querySelector('#otherWorks');
    if (otherWorksElement !== undefined && otherWorksElement !== null) {
      otherWorksElement.innerHTML = tempStr2;

      console.log(allWorksByStudent.length);
      if (allWorksByStudent.length === 1) {
        let parent = document.getElementById('parent');
        let child = document.getElementById('child');
        parent.removeChild(child);
      }
    }
  },
  function (status) {
    console.log(status);
  });

const followBtnElement = document.getElementById('followBtn');

let logedIn = global.sessionStorage.getItem('logged-In');

if (logedIn) {
  let retrievedObject = global.localStorage.getItem('localStorageObject');

  let hopeObject = JSON.parse(retrievedObject);
  console.log('retrievedObject: ', JSON.parse(retrievedObject));
  console.log('searching for the object now');

  let followingOldAray = hopeObject;
  console.log('followingOldAray ', followingOldAray);

  followBtnElement.classList.remove('disabled');
  followBtnElement.classList.add('active');

  let alreadyFollowing = followingOldAray.indexOf(student);
  console.log(alreadyFollowing);

  if (alreadyFollowing !== -1) {
    followBtnElement.classList.remove('active');
    followBtnElement.classList.add('following');
    followBtnElement.innerHTML = `Following`;
  } else {
    let followedProjects = [];
    followBtnElement.addEventListener('click', function () {
      followingOldAray.push(student);
      global.localStorage.setItem('localStorageObject', JSON.stringify(followingOldAray));
    });
  }
}
