// Regex
const REGEX_USERNAME = /^([a-zA-z]+)$/;
const REGEX_PASSWORD = /^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!\"#'$%&()=~|\\/]).{6,16})$/;

// Alert
const SUCCESS = 'success';
const DANGER = 'danger';

// Nocation
const NOC_SUCC = "Success";
const NOC_DANG = "Danger";

// Draw row user
function rowTableUser(obj) {
  var data = `<tr><td scope="row">${obj.username}</td>` +
    `<td>${obj.display_name}</td>` +
    `<td>${obj.email}</td>` +
    `<td>${obj.email_alt}</td>` +
    `<td>${obj.is_chairman == 0 ? 'No' : 'Yes'}</td>` +
    `<td>${obj.is_admin == 0 ? 'No' : 'Yes'}</td>` +
    `<td class="text-center"><input type="text" name="order" value="${obj.order}" style="width: 2rem;"></td>` +
    `<td><button type="button" data-id="${obj.id}" class="btn-edit"><span class="far fa-edit"></span></button>` +
    `<button type="button" data-id="${obj.id}" class="btn-delete"><span class="fas fa-trash-alt"></span></button></td></tr>`;
  return data;
}

function bindMessage(nocation, message, alert) {
  var mss = document.querySelector('.message-alert');
  var data = '<div class="alert alert-' + alert + ' alert-dismissible fade show" role="alert">' +
    '<strong>' + nocation + '!</strong>' + message +
    '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
    '<span aria-hidden="true">&times;</span></button></div>';

  mss.insertAdjacentHTML('beforeend', data);
}

function bindPagination(total, select = 1) {
  var data = `<li class="page-item"><a class="page-link prev" href="#">Previous</a></li>`;
  for (let i = 1; i <= 10; i++) {
    if (i == select) {
      data += `<li class="page-item active"><a class="page-link page" href="#">${i}</a></li>`
    } else {
      data += `<li class="page-item "><a class="page-link page" href="#">${i}</a></li>`
    }
  }
  data += `<li class="page-item"><a class="page-link next" href="#">Next</a></li>`;
  let pagi = document.querySelector('.pagination');
  pagi.innerHTML = "";
  pagi.insertAdjacentHTML('beforeend', data);
}

// Draw table user
function userTable(data) {
  console.log(data);
  let tableUser = document.querySelector('tbody');

  tableUser.innerHTML = "";
  data.forEach(function(item) {
    tableUser.insertAdjacentHTML('beforeend', rowTableUser(item));
  });
  // bindPagination(total);
}

// s
function getDataAjax({ url, action, current_page = 0, next_page = 1, items = 10 }) {
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

      // Chon chinh trang hien tai
      current_page = (current_page == next_page ? current_page - 1 : current_page);

      // Doi cho current vs next
      if (current_page > next_page) {
        next_page = [current_page, current_page = next_page][0];
      }

      // Lay ket qua tra ve
      let response = this.response;

      // Tong so ket qua
      let total = response.length;

      // Do du lieu ra table user
      userTable(response.slice(current_page * items, next_page * items));
      bindPagination(total, next_page);
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
          bindMessage(NOC_SUCC, mss, SUCCESS);
          break;
        } else {
          mss = 'Dang nhap that bai';
          bindMessage(NOC_DANG, mss, DANGER);
        }

        // console.log(mss);
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

function removeActive(elements) {
  elements.forEach((element) => {
    element.classList.remove('active');
  });
}

// function directionPagi(dir) {

//   let pages = document.querySelectorAll('.page-item');
//   let current_page = document.querySelector('.page-item.active');

//   removeActive(pages);

//   if (dir == 1 && current_page.nextElementSibling.className != 'next') {
//     current_page.nextElementSibling.classList.add('active');
//   }

//   if (dir == -1 && current_page.previousElementSibling.className != 'prev') {
//     current_page.previousElementSibling.classList.add('active');
//   }

//   // getDataAjax({
//   //   url: 'https://training.gemvietnam.com/dummy-api/users.json',
//   //   action: 'get',
//   //   current_page: current_page.innerText,
//   //   next_page: current_page.innerText + dir
//   // });
// }
