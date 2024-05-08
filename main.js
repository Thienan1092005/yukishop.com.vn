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
