const nameElement = document.getElementById('Name');
const emailElement = document.getElementById('Email');
const messageElement = document.getElementById('Message');
const formElement = document.getElementById('form');
const alertElement = document.getElementById('alert');
let formSubmitted;

if (formElement !== undefined && formElement !== null) {
  formSubmitted = formElement.innerHTML;
};

let tempstrAlert;
console.log(nameElement);
console.log(emailElement);
console.log(messageElement);
console.log(formElement);
console.log(formSubmitted);

const btnSubmit = document.getElementById('submit');
if (btnSubmit !== undefined && btnSubmit !== null) {
  btnSubmit.onclick = function (event) {
    event.preventDefault();
    tempstrAlert = '';

    // console.log(nameElement);
    let name = nameElement.value;
    console.log(name);

    if (name === '') {
      tempstrAlert += '<p>Fill in your name.</p><br>';
    }

    // console.log(emailElement);
    let email = emailElement.value;
    console.log(email);
    if (email === '') {
      tempstrAlert += '<p>Fill in your email.</p><br>';
    }

    // console.log(messageElement);
    let message = messageElement.value;
    console.log(message);
    if (message === '') {
      tempstrAlert += '<p>Fill in your message.</p>';
    }
    if (alertElement === undefined) {
      return;
    } else {
      alertElement.innerHTML = tempstrAlert;
    };
    if (name && email && message) {
      if (formElement === undefined) {
        return;
      } else {
        formElement.innerHTML = '';
        console.log(formElement.innerHTML);
      };

      let tempstr = `<div class="fb-grid__row">
    <div class="fb-grid__col-xs-1 fb-grid__col-sm-1 fb-grid__col-md-1 fb-grid__col-lg-1 fb-grid__col-xl-1 fb-grid__col-1"></div>
    <div class="fb-grid__col-xs-10 fb-grid__col-sm-10 fb-grid__col-md-10 fb-grid__col-lg-10 fb-grid__col-xl-10 fb-grid__col-10 picText">
        <h6>Message sent</h6>
        <p>Below you can see your sent data.</p><br>
        <p>Your name: ${name}<br><br> Your email: ${email} <br><br> Your message: ${message}</p>
    </div>
    </div>`;
      if (formElement === undefined) {
        return;
      } else {
        formElement.innerHTML += tempstr;
        console.log(formElement.innerHTML);
      };
    };
  };
};
