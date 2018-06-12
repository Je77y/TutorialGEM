// Table
const USER_TABLE = 1;

// Regex
const REGEX_USERNAME = /^([a-zA-z]+)$/;
const REGEX_PASSWORD = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#'$%&()=~|\\/]).{6,16})$/;

// 
// const REGEX = [
//   /^([a-zA-z]+)$/,
//   /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#'$%&()=~|\\/]).{6,16})$/
// ]

// const [USERNAME, PASSWORD] = REGEX;


// Draw row user
function rowTableUser(obj) {
  var data = '<tr>' +
    '<td scope="row">' + obj.first_name + '</td>' +
    '<td>' + obj.display_name + '</td>' +
    '<td>' + obj.email + '</td>' +
    '<td>' + obj.email_alt + '</td>' +
    '<td>' + obj.is_chairman + '</td>' +
    '<td>' + obj.is_admin + '</td>' +
    '<td class="text-center"><input type="text" name="order" value="' + obj.order + '" style="width: 2rem;"></td>' +
    '<td><button type="button" data-id="" class="btn-edit"><span class="far fa-edit"></span></button>' +
    '<button type="button" data-id="" class="btn-delete"><span class="fas fa-trash-alt"></span></button></td></tr>';
  // var tag = document.createElement('div');
  // tag.innerHTML = data;
  return data;
}

// Draw table user
function userTable(data) {
  console.log(data)
  var tableUser = document.querySelector('tbody');
  tableUser.innerHTML = "";
  data.forEach(function(item) {
    var row = rowTableUser(item);
    tableUser.insertAdjacentHTML('beforeend', row);
    // console.log(row);
  });
}

// s
function getDataAjax({ url, action, table = 1 }) {
  //Khoi tao doi tuong
  var xhttp = new XMLHttpRequest();
  //cau hinh request
  xhttp.open(action, url, true);
  xhttp.responseType = 'json';
  //Bat su kien thay doi trang thai cuar request
  xhttp.onreadystatechange = function() {
    // console.log(this.readyState)
    //Kiem tra neu nhu da gui request thanh cong
    if (this.status === 200 && this.readyState === XMLHttpRequest.DONE) {
      var response = this.response;

      if (table = USER_TABLE) {
        userTable(response);
      }
    }
  }

  //gui request
  xhttp.send();
}

function dataAjax({ url, action, data }) {
  //Khoi tao doi tuong
  var xhttp = new XMLHttpRequest();
  var mss = '';
  //cau hinh request
  xhttp.open(action, url, true);
  xhttp.responseType = 'json';
  //Bat su kien thay doi trang thai cuar request
  xhttp.onreadystatechange = function() {
    // console.log(this.readyState)
    //Kiem tra neu nhu da gui request thanh cong
    if (this.status === 200 && this.readyState === XMLHttpRequest.DONE) {
      var response = this.response;

      response.forEach((user) => {
        const { password, username } = user;
        if (data.password == password && data.username == username) {
          mss = 'Dang nhap thanh cong';
        } else {
          mss = 'Dang nhap that bai';
        }

        console.log(mss);
      });
    }
  }

  //gui request
  xhttp.send();
}

function checkRegx(value, regx) {
  return regx.test(value);
}

function showError(element, error) {
  element.classList.add('is-invalid');
  element.nextElementSibling.innerText = error;
}

// function checkNameRegx(name) {
  
// }

// function checkError(input, error) {

//   if (!checkRegx(input.value,  )) {
//     showError(input, "Invalid Username");
//   } else {
//     input.classList.remove('is-invalid');
//   }
// }
