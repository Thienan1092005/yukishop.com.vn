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

let cartItem = [];
let saleCode = 0;

const renderCard = () => {
  const cartTable = document.querySelector(".cart--item__table");
  cartTable.innerHTML = cartItem
    .map((item) => {
      let totalPrice = formatPriceToString(
        item.quantity * convertPriceToNumber(item.phonePrice)
      );
      return `<tr>
            <td>
              <img src="${item.phoneImg}" alt="" width="100" height="150" />
            </td>
            <td class ="table--item__name">${item.phoneName}</td>
            <td>${formatPriceToString(item.phonePrice)}</td>
            <td>
              <div class="quantity">
                <button class="quantity-btn" onclick="decrease(${
                  item.id
                })">-</button>
                <input type="text" class="quantity-input" value="${
                  item.quantity
                }" />
                <button class="quantity-btn"onclick="increase(${
                  item.id
                })">+</button>
              </div>
            </td>
            <td>${totalPrice}</td>
          </tr>`;
    })
    .join("");
  let allTotal = 0;
  for (let i = 0; i < cartItem.length; i++) {
    allTotal += cartItem[i].quantity;
  }
  document.querySelector(".cartItemNumber").innerHTML = allTotal;
  let allPrice = 0;
  for (let i = 0; i < cartItem.length; i++) {
    allPrice +=
      cartItem[i].quantity * convertPriceToNumber(cartItem[i].phonePrice);
  }
  const totalPrice = allPrice;
  let thue = totalPrice * 0.1;
  let giaCuoiCung = allPrice + thue;
  document.querySelector(".totalItem").innerHTML =
    formatPriceToString(totalPrice) + "₫";
  document.querySelector(".cost--price").innerHTML =
    formatPriceToString(totalPrice) + "₫";
  document.querySelector(".thue--price").innerHTML =
    formatPriceToString(thue) + "₫";
  if (giaCuoiCung <= saleCode) {
    document.querySelector(".totaiall--price").innerHTML = "0" + "₫";
  } else {
    document.querySelector(".totaiall--price").innerHTML =
      formatPriceToString(giaCuoiCung - saleCode) + "₫";
  }
};

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
    renderCard();
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
  document.querySelector(".cart--item--number").innerText =
    cartItem.length + " Item";
};

const increase = (id) => {
  const selectedItem = cartItem.find((item) => {
    return item.id == id;
  });
  selectedItem.quantity++;
  renderCard();
};

const decrease = (id) => {
  const selectedItem = cartItem.find((item) => {
    return item.id == id;
  });
  if (selectedItem.quantity <= 0) {
    return;
  } else {
    selectedItem.quantity--;
  }
  renderCard();
};

document.querySelector(".apply").addEventListener("click", () => {
  const salecodeEle = document.querySelector("#salecode");
  if (salecodeEle.value == "JackBoCon") {
    saleCode = 5000000;
  } else {
    saleCode = 0;
  }
  renderCard();
});
document.querySelector("#finalcheckout").addEventListener("click", () => {
  cartItem = [];
  saleCode = 0;
  renderCard();
  activeCart();
});
