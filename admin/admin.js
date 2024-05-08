let phoneData = [];
let selectedID = null;
const btnOpenForm = document.querySelector("#btnopenform");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const imgSrc = document.querySelector("#img");
const rate = document.querySelector("#rate");
const tbodyctn = document.querySelector(".tbodyctn");
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
  tbodyctn.innerHTML = phoneData
    .map((phone) => {
      return `<tr>
    <td>${phone.id}</td>
    <td>${phone.phoneName}</td>
    <td>${phone.phonePrice}</td>
    <td>${phone.phoneStar}</td>
    <td>
      <button onclick="handleDelete(${phone.id})" >delete</button>
      <button onclick = "handleEdit(${phone.id})">Edit</button>
    </td>
  </tr>`;
    })
    .join();
};
const handleDelete = async (id) => {
  await axios({
    method: "DELETE",
    url: `https://662b63d6de35f91de1581587.mockapi.io/yukishopap/${id}`,
  });
  getData();
};
btnOpenForm.addEventListener("click", () => {
  document.querySelector(".additem").style.display = "block";
});

const handleEdit = async (id) => {
  document.querySelector(".additem").style.display = "block";
  const respoint = await axios({
    method: "GET",
    url: `https://662b63d6de35f91de1581587.mockapi.io/yukishopap/${id}`,
  });
  name.value = respoint.data.phoneName;
  price.value = respoint.data.phonePrice;
  imgSrc.value = respoint.data.phoneImg;
  rate.value = respoint.data.phoneStar;
  selectedID = id;
};
const handleUpdate = async () => {
  const respoint = await axios({
    method: "PUT",
    url: `https://662b63d6de35f91de1581587.mockapi.io/yukishopap/${selectedID}`,
    data: {
      phoneName: name.value,
      phonePrice: price.value,
      phoneImg: imgSrc.value,
      phoneStar: parseInt(rate.value),
    },
  });
  getData();
};
const addItem = async () => {
  await axios({
    method: "POST",
    url: "https://662b63d6de35f91de1581587.mockapi.io/yukishopap",
    data: {
      phoneName: name.value,
      phonePrice: price.value,
      phoneImg: imgSrc.value,
      phoneStar: parseInt(rate.value),
    },
  });
  name.value = "";
  price.value = "";
  imgSrc.value = "";
  rate.value = "";
  getData();
};
document.querySelector(".btnExit").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".additem").style.display = "none";
});
document.querySelector(".btnaddform").addEventListener("click", (e) => {
  e.preventDefault();
  addItem();
  document.querySelector(".additem").style.display = "none";
});
document.querySelector(".btnUpdate").addEventListener("click", (e) => {
  e.preventDefault();
  handleUpdate();
  document.querySelector(".additem").style.display = "none";
});
getData();
