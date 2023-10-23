// const cardImages = {
//   mastercard: "image/mastercard.jpg",
//   paypal: "image/paypal.png",
//   visa: "image/visa.png",
//   amex: "image/american express.png",
//   discover: "image/discover.jpg",
// };
// document.write(image);
let userCards = JSON.parse(localStorage.getItem("userCards")) || [];
const inputCard = document.querySelector("#cardNumber");
const inputDate = document.querySelector("#Date");
const inputPass = document.querySelector("#password");
let temp = -1;

function addToList() {
  const tbody1 = document.querySelector("#tbody1"); // Thêm thể hiện cho tbody1
  tbody1.innerHTML = "";
  let ds = "";
  for (let i = 0; i < userCards.length; i++) {
    const date = formatToMMYY(userCards[i].date);
    const cardNumber = hideCardNumber(userCards[i].card);
    ds += `<tr>
            <td><img id="" src="image/mastercard.jpg"</td>
            <td>${
              userCards[i].showCVV
                ? userCards[i].card
                : hideCardNumber(userCards[i].card)
            }</td>
            <td>${date}</td>
            <td>${userCards[i].showCVV ? userCards[i].Password : "***"}</td>
            <td><button onclick="view(${i})">View</button></td>
            <td><button onclick="edit(${i})">Edit</button></td>
            <td><button onclick="deleteCard(${i})">Delete</button></td>
            </tr>`;
  }
  tbody1.innerHTML = ds;
}

function formatToMMYY(dateString) {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  return `${month}/${year}`;
}

function pressSave() {
  const card = inputCard.value;
  const date = inputDate.value;
  const password = inputPass.value;
  if (temp === -1) {
    if (card === "" || date === "" || password === "") {
      alert(
        `điền đầy đủ thông tin: ${card === "" ? "card" : ""},${
          date === "" ? "date" : ""
        },${password === "" ? "password" : ""} `
      );
    } else if (!isValidDate(date)) {
      alert(`nhập sai định dạng MM/YY`);
    } else if (userCards.every((item) => item.card !== card)) {
      userCards.push({ card, date, Password: password, showCVV: false });
      addToList();
      save();
    } else if (userCards.some((item) => item.card === card)) {
      alert(`Trùng số thẻ`);
    }
  } else {
    userCards[temp].card = card;
    userCards[temp].date = date;
    userCards[temp].Password = password;
    alert(`Đã chỉnh sửa`);
    temp = -1;
    addToList();
    save();
  }
}

function view(i) {
  userCards[i].showCVV = !userCards[i].showCVV;
  addToList();
  save();
}

function edit(i) {
  inputCard.value = userCards[i].card;
  inputDate.value = userCards[i].date;
  inputPass.value = userCards[i].Password;
  temp = i;
}

function save() {
  localStorage.setItem("userCards", JSON.stringify(userCards));
}

function deleteCard(i) {
  userCards.splice(i, 1);
  addToList();
  save();
}
function hideCardNumber(card) {
  return card.slice(0, 6) + "******" + card.slice(13);
}
function isValidDate(dateString) {
  const datePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return datePattern.test(dateString);
}

window.addEventListener("load", () => {
  addToList();
});
