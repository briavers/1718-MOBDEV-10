console.log('json is called in');

function getJsonByCallbacks (url, succesHandler, errorHandler) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.open('GET', url, true);
  xhr.onload = function () {
    if (xhr.status === 200) {
      var data = (!xhr.responseType) ? JSON.parse(response) : xhr.response;
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

getJsonByCallbacks('https://api.myjson.com/bins/jftnf',
  function (data) {
    console.log(data);
    let usersData = data.users;
    console.log(usersData);
    let projectsData = data.projects;
    console.log(projectsData);
    let blogData = data.articles;
    console.log(blogData);
    let projectsElement = document.querySelector('#artworks');

    // lege string aan maken
    var tempStr = '';
    // The forEach() method executes a provided function once for each array element.
    for (let i = 0; i < 5; ++i) {
      // projectsData.forEach(function(uitvoer) {
      // de tempstr aanvullen met de ingeladen informatie
      tempStr +=
         `<div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1 scroll"></div>
          <div class="fb-grid__col-xs-8 fb-grid__col-sm-8 fb-grid__col-md-8 fb-grid__col-lg-8 fb-grid__col-xl-8 fb-grid__col-8 scroll">
            <a href="./detailArtwork.html?project=${projectsData[i].projectId}">
              <div class="picText">
                <img src="${projectsData[i].pictures}" alt="picture of the campus" class="height">
                <div class= "textHeight">
                    <h5>${projectsData[i].projectName}</h5>
                    <p>${projectsData[i].artist}</br>
                    ${projectsData[i].degree}</p>
                    <span class="tag tagArticle">${projectsData[i].tags[0]}</span>
                </div>
              </div>
            </a>
          </div>`;
    };

    // de html in het element veranderen naar de inhoud van tempstr
    if (projectsElement !== undefined && projectsElement !== null) {
      projectsElement.innerHTML = tempStr;
    };
    let blogElement = document.querySelector('#blog');
    // lege string aan maken
    var tempStr2 = '';
    console.log(blogData.image);
    // The forEach() method executes a provided function once for each array element.
    for (let i = 0; i < 3; ++i) {
      // projectsData.forEach(function(uitvoer) {
      // de tempstr aanvullen met de ingeladen informatie
      tempStr2 +=
           `<a href="./detailBlog.html?project=${blogData[i].articleId}"> <div class="fb-grid__row margin-top blogSum">
              <div class="fb-grid__col-xs-3 fb-grid__col-sm-3 fb-grid__col-md-3 fb-grid__col-lg-3 fb-grid__col-xl-3 fb-grid__col-3">
                <img src="${blogData[i].image}" alt="logo Portfolio rex" class="radius5"> </div>
                <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
                <div class="fb-grid__col-xs-6 fb-grid__col-sm-6 fb-grid__col-md-6 fb-grid__col-lg-6 fb-grid__col-xl-6 fb-grid__col-6">
                <h5 class="articleName">${blogData[i].articleName}</h5>
                <span class="date"> ${blogData[i].date}</br> </span>
               
              </div>
            </div></a>`;
    };

    // de html in het element veranderen naar de inhoud van tempstr
    if (blogElement !== undefined && blogElement !== null) {
      blogElement.innerHTML = tempStr2;
    };
  },
  function (status) {
    console.log(status);
  }
);
