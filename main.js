const accountControlElement = document.querySelector(".accout--control");
const container = document.querySelector(".container");
const adminControlpaner = document.querySelector(".adminControlpaner");
const cart = document.querySelector(".cart");
let login = false;

const convertPriceToNumber = (priceString) => {
  return parseInt(priceString.replace(/\s|₫/g, ""));
};

const formatPriceToString = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  })
    .format(price)
    .replace("₫", "")
    .replace(/\D/g, "")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
};
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
        src="${phone.phoneImg}"
        alt=""
        class="produce--img"
      />
      <div class="produce--content">
        <h1 class="produce--name">
           ${phone.phoneName}
        </h1>
        <h2 class="produce--price">${formatPriceToString(
          phone.phonePrice
        )} ₫</h2>
        <div class="addtocart">
          <div class="stars">
            ${stars}
          </div>
          <button onclick ="addToCart(${
            phone.id
          })" class="produce--btn__buy">Add to card</button>
        </div>
      </div>
      <!-- end a contetn produce  -->
    </div>`;
    })
    .join("");
};
getData();
//cart control//

const cartItem = [];

const addToCart = async (id) => {
  try {
    const response = await axios.get(
      `https://662b63d6de35f91de1581587.mockapi.io/yukishopap/${id}`
    );
    const phone = response.data;
    const existingItem = cartItem.find((item) => item.id == id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItem.push({
        ...phone,
        quantity: 1,
      });
    }
    const cartTable = document.querySelector(".cart--item__table");
    cartTable.innerHTML = cartItem
      .map((item) => {
        return `<tr>
              <td>
                <img src="${item.phoneImg}" alt="" width="100" height="150" />
              </td>
              <td>${item.phoneName}</td>
              <td>${formatPriceToString(item.phonePrice)}</td>
              <td>
                <div class="quantity">
                  <button class="quantity-btn" data-action="decrease">-</button>
                  <input type="text" class="quantity-input" value="${
                    item.quantity
                  }" />
                  <button class="quantity-btn" data-action="increase">+</button>
                </div>
              </td>
              <td>${formatPriceToString(
                item.quantity * convertPriceToNumber(item.phonePrice)
              )}</td>
            </tr>`;
      })
      .join("");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
  console.log(cartItem);
  document.querySelector(".cart--item--number").innerText =
    cartItem.length + " Item";
};
