const HOST_NAME = "api.appworks-school.tw";
const API_VERSION = "1.0";
let trigger = true;
let productCategory;
let keyWord = "";

function getPageTag() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageTag = urlParams.get("tag");
  return pageTag;
}

window.addEventListener("DOMContentLoaded", function () {
  // getCampaignData();
  repeatMarketingCampaign();
  productCategory = getPageTag();
  if (productCategory === null || productCategory === "all") {
    productCategory = "all";
    getProductAPI();
  } else if (
    productCategory === "women" ||
    productCategory === "men" ||
    productCategory === "accessories"
  ) {
    getProductAPI();
  } else {
    productCategory = `search?keyword=`;
    keyWord = `${getPageTag()}&`;
    getProductAPI();
  }
});

async function repeatMarketingCampaign() {
  await getCampaignData();
  const bannerArry = document.querySelectorAll(".banner");
  const dotArry = document.querySelectorAll(".dot");

  let index = 0;

  function carouselTimer() {
    for (let x = 0; x < bannerArry.length; x++) {
      bannerArry[x].className = "banner";
      dotArry[x].className = "dot";
    }

    bannerArry[index].className = "banner--active";
    dotArry[index].className = "dot--active";

    if (index < bannerArry.length - 1) {
      index++;
    } else {
      index = 0;
    }

    dotArry.forEach((dot, dotIndex) => {
      dot.addEventListener("click", () => {
        for (let i = 0; i < bannerArry.length; i++) {
          dotArry[i].className = "dot";
          bannerArry[i].className = "banner";
        }
        dot.className = "dot--active";
        bannerArry[dotIndex].className = "banner--active";
        index = dotIndex; // repeat slide effect with order
      });
    });
  }

  carouselTimer();
  window.setInterval(carouselTimer, 5000);
}

async function getCampaignData() {
  await fetch(`https://${HOST_NAME}/api/${API_VERSION}/marketing/campaigns`)
    .then((res) => {
      return res.json();
    })
    .then((campaignData) => {
      renderCampaignData(campaignData);
    });
}

function renderCampaignData(cmpData) {
  const dotsDiv = document.createElement("div");
  dotsDiv.setAttribute("class", "dot-section");
  document.querySelector(".banner-section").appendChild(dotsDiv);

  for (let i = 0; i < cmpData.data.length; i++) {
    const cmpPicture = cmpData.data[i].picture;
    const cmpStory = cmpData.data[i].story;
    const pdtId = cmpData.data[i].product_id;

    const banner = document.createElement("a");
    banner.setAttribute("class", "banner");
    banner.setAttribute("href", `product.html?id=${pdtId}`);
    document.querySelector(".banner-section").appendChild(banner);

    const cmpStoryDiv = document.createElement("div");
    cmpStoryDiv.setAttribute("class", "banner-text-1");
    cmpStoryDiv.setAttribute("href", `product.html?id=${pdtId}`);
    banner.appendChild(cmpStoryDiv);

    const dotDiv = document.createElement("div");
    dotDiv.setAttribute("class", "dot");
    dotsDiv.appendChild(dotDiv);

    document.querySelector(".banner-section").appendChild(dotsDiv);

    banner.style.backgroundImage = `url("${cmpPicture}")`;
    cmpStoryDiv.textContent = cmpStory;
  }
}

let nextPage = 0;
function getProductAPI() {
  fetch(
    `https://${HOST_NAME}/api/${API_VERSION}/products/${productCategory}${keyWord}?paging=${nextPage}`
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      let data = result.data;
      let nextPaging = result.next_paging;
      renderProducts(data, nextPaging);
    });
}

function renderProducts(data, nextPaging) {
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      let title = data[i].title;
      let price = data[i].price;
      let colors = data[i].colors;
      let mainImage = data[i].main_image;
      let id = data[i].id;

      const pdtName = document.createElement("div");
      pdtName.setAttribute("class", "product-name");
      pdtName.textContent = title;

      const pdtPriceDiv = document.createElement("div");
      pdtPriceDiv.setAttribute("class", "product-price");
      pdtPriceDiv.textContent = `TWD.${price}`;

      const img = document.createElement("img");
      img.setAttribute("src", `${mainImage}`);
      img.setAttribute("alt", "item-picture");

      const pdtColorsDiv = document.createElement("div");
      pdtColorsDiv.setAttribute("class", "product-colors");

      for (let j = 0; j < colors.length; j++) {
        let color = colors[j].code;
        const pdtColorDiv = document.createElement("div");
        pdtColorDiv.setAttribute("class", "product-color");
        pdtColorDiv.setAttribute("style", `background-color: #${color}`);
        pdtColorsDiv.appendChild(pdtColorDiv);
      }

      const product = document.createElement("a");
      product.setAttribute("class", "product");
      product.setAttribute("href", `product.html?id=${id}`);

      product.appendChild(img);
      product.appendChild(pdtColorsDiv);
      product.appendChild(pdtName);
      product.appendChild(pdtPriceDiv);

      document.querySelector(".products").appendChild(product);
    }
  } else {
    document.querySelector(".response").innerHTML = "搜尋不到產品喔";
  }

  if (nextPaging) {
    nextPage = nextPaging;
    trigger = true;
  } else {
    trigger = false;
  }
}

// Scroll event
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (trigger == true && scrollTop + clientHeight >= scrollHeight - 140) {
    trigger = false;
    getProductAPI();
  }
});
