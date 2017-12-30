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

    console.log(blogData);
    let blogID = (getUrlVars.vars()['project'] - 1);
    console.log(blogID);
    let tempStr = '';
    let blogInfo = blogData[blogID];
    let blogElement = document.querySelector('#blogPost');
    console.log(blogInfo);
    if (blogInfo !== undefined && blogInfo !== null) {
      tempStr +=
      `
      <div class="fb-grid__row">
        <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
        <div class="fb-grid__col-xs-10 fb-grid__col-sm-10 fb-grid__col-md-10 fb-grid__col-lg-10 fb-grid__col-xl-10 fb-grid__col-10">
          <div class="picText">
            <img src="${blogInfo.image}" alt="picture of the campus">
            <h4>  ${blogInfo.articleName}</h4>
            <h5 class="date">${blogInfo.date}</h5>
            <p>${blogInfo.body}</p>
          </div>
        </div>
        <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
      </div>`;
    };
    if (blogElement !== undefined && blogElement !== null) {
      blogElement.innerHTML = tempStr;
    };
  },
  (status) => {
    console.log(status);
  }
);
