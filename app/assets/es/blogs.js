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

getJsonByCallbacks.getJson('https://api.myjson.com/bins/jftnf',
  (data) => {
    let blogData = data.articles;
    let tempStr = '';
    for (let i = 0; i < 3; ++i) {
      console.info('inside the for loop');
      tempStr +=
          `<div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1 scroll"></div>
            <div class="fb-grid__col-xs-8 fb-grid__col-sm-8 fb-grid__col-md-8 fb-grid__col-lg-8 fb-grid__col-xl-8 fb-grid__col-8 scroll">
              <a href="./detailBlog.html?project=${blogData[i].articleId}">
                <div class="picText">
                  <img src="${blogData[i].image}" alt="picture of the campus" class="height">
                  <div class= "textHeight">
                      <h5>${blogData[i].articleName}</h5>
                      <p>${blogData[i].shortBody}</p>
                  </div>
                </div>
              </a>
            </div>`;
    }
    let popularPostsElement = document.querySelector('#popularPosts');
    if (popularPostsElement !== undefined && popularPostsElement !== null) {
      popularPostsElement.innerHTML = tempStr;
    };
    let tempStr2 = '';
    let allPostsElement = document.querySelector('#allBlogPosts');
    blogData.forEach((blogData) => {
      tempStr2 +=
          `<a href="./detailBlog.html?project=${blogData.articleId}"> <div class="fb-grid__row margin-top blogSum">
              <div class="fb-grid__col-xs-3 fb-grid__col-sm-3 fb-grid__col-md-3 fb-grid__col-lg-3 fb-grid__col-xl-3 fb-grid__col-3">
                <img src="${blogData.image}" alt="logo Portfolio rex" class="radius5"> </div>
                <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
                <div class="fb-grid__col-xs-6 fb-grid__col-sm-6 fb-grid__col-md-6 fb-grid__col-lg-6 fb-grid__col-xl-6 fb-grid__col-6">
                <h5 class="articleName">${blogData.articleName}</h5>
                <span class="date"> ${blogData.date}<br> </span>
                <span class="tag tagArticle">Article</span>
              </div> 
            </div></a>`;
    });
    if (allPostsElement !== undefined && allPostsElement !== null) {
      allPostsElement.innerHTML = tempStr2;
    };
  },
  (status) => {
    console.log(status);
  }
);
