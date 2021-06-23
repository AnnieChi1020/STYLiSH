// get order number parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const orderNumberTag = urlParams.get("number");

const orderNumber = document.querySelector("#order-number");
orderNumber.textContent = orderNumberTag;

setTimeout(function () {
  const thankYou = document.querySelector(".thank-you");
  thankYou.style.display = "block";
  const loader = document.querySelector(".loader");
  loader.style.display = "none";
}, 3000);

const backToShopButton = document.querySelector("#continue");
backToShopButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
