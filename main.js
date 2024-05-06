const accountControlElement = document.querySelector(".accout--control");
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
      <a target="_blank" rel="noopener" href="./admin/admincontrol.html">
        <img src="./assets/mylove.jpg" alt="" />
      </a>
    `;
  }
};

const activeCart = () => {
  console.log(123);
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
};

cart.classList.remove("active");
renderAccountControl();
