const accountControlElement = document.querySelector(".accout--control");
const container = document.querySelector(".container");
const adminControlpaner = document.querySelector(".adminControlpaner");
const cart = document.querySelector(".cart");
let login = false;

const renderAccountControl = () => {
  if (!login) {
    accountControlElement.innerHTML = `
      <button onclick="setLogin()">Đăng nhập</button>
    `;
  } else {
    accountControlElement.innerHTML = `
      <button onclick="activeCart()">Checkout</button>
      <img onclick ="activeAccoutCtrl()" src="./assets/mylove.jpg" alt="" />
    `;
  }
};

const activeAccoutCtrl = () => {
  adminControlpaner.classList.toggle("activeFlex");
};
const activeCart = () => {
  cart.classList.toggle("active");
};

const setLogin = () => {
  login = true;
  Swal.fire({
    title: "Thành công!",
    text: "Đăng nhập thành công",
    icon: "success",
  });
  renderAccountControl();
  container.classList.remove("disable");
  getData();
};
const setLogOut = () => {
  login = false;
  Swal.fire({
    title: "Thành công!",
    text: "Đăng xuất thành công",
    icon: "success",
  });
  renderAccountControl();
  removePanel();
};

const removePanel = () => {
  cart.classList.remove("active");
  container.classList.add("disable");
  adminControlpaner.classList.remove("activeFlex");
};
document.querySelector(".Logout").addEventListener("click", setLogOut);
renderAccountControl();
removePanel();
// phone rendering//
const produceMain = document.querySelector(".produce--main");
let phoneData = [];
const getData = async () => {
  const res = await axios({
    method: "GET",
    url: "https://662b63d6de35f91de1581587.mockapi.io/yukishopap",
  });
  phoneData = res.data;
  console.log(phoneData);
  renderPhone();
};

const renderPhone = () => {
  produceMain.innerHTML = phoneData
    .map((phone) => {
      let stars = "";
      if (typeof phone.phoneStar === "number") {
        for (let i = 0; i < phone.phoneStar; i++) {
          stars += `<ion-icon name="star"></ion-icon>`;
        }
      }
      return `<div class="produce--boxed">
        <img
          src="${
            phone.phoneImg ||
            `https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/i/p/iphone-14-pro_2__4.png`
          }"
          alt=""
          class="produce--img"
        />
        <p class="produce--price">${phone.phonePrice} VND</p>
        <p class="produce--name">${phone.phoneName}</p>
        <div class="rate">
          ${stars}
          <span>5/5</span>
        </div>
        <button class="produce--btn__buy">Buy Now</button>
      </div>`;
    })
    .join("");
};
getData();
