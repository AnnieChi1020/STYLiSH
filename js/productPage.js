const HOST_NAME = "api.appworks-school.tw";
const API_VERSION = "1.0";
const productPageCart = document.querySelector("#cart-number");
const productPageCartMobile = document.querySelector(
  ".mobile-shopping-cart #cart-number"
);
let productPageCartNumber;
let selectedColor = "";
let selectedSize = "";
let pVariants = "";
let pSizes = "";
let pColors = "";
let stock = "";
let quantityNumber = 1;

function getPageId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const pageId = urlParams.get("id");
  return pageId;
}

function getProductAPI() {
  fetch(
    `https://${HOST_NAME}/api/${API_VERSION}/products/details?id=${getPageId()}`
  )
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      renderProductData(result);
    });
}

function renderProductData(result) {
  let productData = result.data;
  let pMainImage = productData.main_image;
  let pTitle = productData.title;
  let pId = productData.id;
  let pPrice = productData.price;
  pColors = productData.colors;
  pSizes = productData.sizes;
  let pTexture = productData.texture;
  let pDescription = productData.description;
  let pWash = productData.wash;
  let pPlace = productData.place;
  let pNote = productData.note;
  let pStory = productData.story;
  let pImages = productData.images;
  pVariants = productData.variants;

  const mainImageImg = document.createElement("img");
  mainImageImg.setAttribute("class", "product__main-image");
  mainImageImg.setAttribute("alt", "main image of the product");
  document.querySelector(".product").appendChild(mainImageImg);
  mainImageImg.setAttribute("src", `${pMainImage}`);

  const pdtDetailDiv = document.createElement("div");
  pdtDetailDiv.setAttribute("class", "product__detail");
  document.querySelector(".product").appendChild(pdtDetailDiv);

  const pdtTitleDiv = document.createElement("div");
  pdtTitleDiv.setAttribute("class", "product__title");
  pdtTitleDiv.innerHTML = `${pTitle}`;
  pdtDetailDiv.appendChild(pdtTitleDiv);

  const pdtId = document.createElement("div");
  pdtId.setAttribute("class", "product__id");
  pdtId.innerHTML = `${pId}`;
  pdtDetailDiv.appendChild(pdtId);

  const pdtPriceDiv = document.createElement("div");
  pdtPriceDiv.setAttribute("class", "product__price");
  pdtPriceDiv.innerHTML = `TWD. ${pPrice}`;
  pdtDetailDiv.appendChild(pdtPriceDiv);

  const pdtVariantsDiv = document.createElement("div");
  pdtVariantsDiv.setAttribute("class", "product__variants");
  pdtDetailDiv.appendChild(pdtVariantsDiv);

  for (let i = 0; i < 3; i++) {
    const pdtVariantDiv = document.createElement("div");
    pdtVariantDiv.setAttribute("class", "product__variant");
    pdtVariantsDiv.appendChild(pdtVariantDiv);
  }

  const variantArry = document.querySelectorAll(".product__variant");
  const variantName = ["顏色 | ", "尺寸 | ", "數量 | "];

  variantArry[2].setAttribute(
    "class",
    "product__variant product__variant__quantity"
  );

  for (let i = 0; i < 3; i++) {
    const pdtName = document.createElement("div");
    pdtName.setAttribute("class", "product__variant-name");
    variantArry[i].appendChild(pdtName);
  }

  const variantNameArry = document.querySelectorAll(".product__variant-name");

  for (let i = 0; i < 3; i++) {
    variantNameArry[i].innerHTML = `${variantName[i]}`;
  }

  const pdtColorsDiv = document.createElement("div");
  pdtColorsDiv.setAttribute("class", "product__colors");
  variantArry[0].appendChild(pdtColorsDiv);

  for (let i = 0; i < pColors.length; i++) {
    const pdtColorDiv = document.createElement("div");
    pdtColorDiv.setAttribute("class", "product__color");
    pdtColorDiv.setAttribute("id", `${pColors[i].name}`);
    pdtColorDiv.style.backgroundColor = `#${pColors[i].code}`;
    pdtColorsDiv.appendChild(pdtColorDiv);
  }

  const pdtSizesDiv = document.createElement("div");
  pdtSizesDiv.setAttribute("class", "product__sizes");
  variantArry[1].appendChild(pdtSizesDiv);

  for (let i = 0; i < pSizes.length; i++) {
    const pdtSizeDiv = document.createElement("div");
    pdtSizeDiv.setAttribute("class", "product__size");
    pdtSizeDiv.innerHTML = `${pSizes[i]}`;
    pdtSizesDiv.appendChild(pdtSizeDiv);
  }

  const pdtQuantityDiv = document.createElement("div");
  pdtQuantityDiv.setAttribute("class", "product__quantity");
  variantArry[2].appendChild(pdtQuantityDiv);

  const decrement = document.createElement("button");
  decrement.setAttribute("id", "decrement");
  decrement.innerHTML = "-";
  pdtQuantityDiv.appendChild(decrement);

  const quantityDiv = document.createElement("div");
  quantityDiv.setAttribute("class", "quantity");
  quantityDiv.innerHTML = quantityNumber;
  pdtQuantityDiv.appendChild(quantityDiv);

  const increment = document.createElement("button");
  increment.setAttribute("id", "increment");
  increment.innerHTML = "+";
  pdtQuantityDiv.appendChild(increment);

  const button = document.createElement("button");
  button.setAttribute("id", "add-to-cart");
  button.innerHTML = "加入購物車";
  pdtDetailDiv.appendChild(button);

  const pdtNoteDiv = document.createElement("div");
  pdtNoteDiv.setAttribute("class", "product__note");
  pdtNoteDiv.innerHTML = `${pNote}`;
  pdtDetailDiv.appendChild(pdtNoteDiv);

  const pdtTextureDiv = document.createElement("div");
  pdtTextureDiv.setAttribute("class", "product__texture");
  pdtTextureDiv.innerHTML = `${pTexture}`;
  pdtDetailDiv.appendChild(pdtTextureDiv);

  const pdtDescriptionDiv = document.createElement("div");
  pdtDescriptionDiv.setAttribute("class", "product__description");
  pdtDescriptionDiv.innerHTML = `${pDescription}`;
  pdtDetailDiv.appendChild(pdtDescriptionDiv);

  const pdtWashDiv = document.createElement("div");
  pdtWashDiv.setAttribute("class", "product__wash");
  pdtWashDiv.innerHTML = `清洗：${pWash}`;
  pdtDetailDiv.appendChild(pdtWashDiv);

  const pdtPlaceDiv = document.createElement("div");
  pdtPlaceDiv.setAttribute("class", "product__place");
  pdtPlaceDiv.innerHTML = `產地：${pPlace}`;
  pdtDetailDiv.appendChild(pdtPlaceDiv);

  const seperatorDiv = document.createElement("div");
  seperatorDiv.setAttribute("class", "seperator");
  document.querySelector(".product").appendChild(seperatorDiv);
  seperatorDiv.innerHTML = "更多產品資訊";

  const pdtStoryDiv = document.createElement("div");
  pdtStoryDiv.setAttribute("class", "product__story");
  pdtStoryDiv.innerHTML = `${pStory}`;
  document.querySelector(".product").appendChild(pdtStoryDiv);

  for (let i = 0; i < pImages.length; i++) {
    const pdtImageImg = document.createElement("img");
    pdtImageImg.setAttribute("class", "product__image");
    pdtImageImg.setAttribute("src", `${pImages[i]}`);
    pdtImageImg.setAttribute("alt", "reference images");
    document.querySelector(".product").appendChild(pdtImageImg);
  }

  selectDefaultChoice();
  calculateQuantity();
}

// Calculate quantity
function calculateQuantity() {
  const calculateNumber = document.querySelector(".quantity");

  selectProductColor();
  selectProductSize();

  document.querySelector("#increment").addEventListener("click", () => {
    getStock();
    if (quantityNumber < stock) {
      quantityNumber = quantityNumber + 1;
      calculateNumber.innerHTML = quantityNumber;
    }
  });
  document.querySelector("#decrement").addEventListener("click", () => {
    if (quantityNumber > 1) {
      quantityNumber = quantityNumber - 1;
      calculateNumber.innerHTML = quantityNumber;
    }
  });

  addProductToCart();
}

async function selectDefaultChoice() {
  const colorArry = document.querySelectorAll(".product__color");
  const sizeArry = document.querySelectorAll(".product__size");
  for (let i = 0; i < colorArry.length; i++) {
    for (let j = 0; j < sizeArry.length; j++) {
      for (let k = 0; k < pVariants.length; k++) {
        if (
          getSelectedColor(colorArry[i]) === pVariants[k].color_code &&
          pVariants[k].size === sizeArry[j].outerText &&
          pVariants[k].stock === 0
        ) {
          sizeArry[j].className = "product__size product__size--disabled";
        } else if (
          getSelectedColor(colorArry[i]) === pVariants[k].color_code &&
          pVariants[k].size === sizeArry[j].outerText &&
          pVariants[k].stock > 0
        ) {
          colorArry[i].className = "product__color product__color--selected";
          sizeArry[j].className = "product__size product__size--selected";
          return;
        }
      }
    }
  }
}

function getStock() {
  selectedColor = getSelectedColor(
    document.querySelector(".product__color--selected")
  );
  for (let i = 0; i < pVariants.length; i++) {
    if (
      pVariants[i].color_code == selectedColor.toUpperCase() &&
      pVariants[i].size == selectedSize
    ) {
      stock = pVariants[i].stock;
    }
  }
}

function selectProductColor() {
  const colorArry = document.querySelectorAll(".product__color");
  const sizeArry = document.querySelectorAll(".product__size");
  selectedColor = getSelectedColor(
    document.querySelector(".product__color--selected")
  );
  for (let i = 0; i < colorArry.length; i++) {
    colorArry[i].addEventListener("click", () => {
      for (let index = 0; index < sizeArry.length; index++) {
        if (
          sizeArry[index].className == "product__size product__size--selected"
        ) {
          sizeArry[index].className = "product__size product__size--selected";
        } else {
          sizeArry[index].className = "product__size";
          sizeArry[index].style.pointerEvents = "auto";
        }
      }
      for (let index = 0; index < colorArry.length; index++) {
        colorArry[index].className = "product__color";
      }
      colorArry[i].className += " product__color--selected";
      selectedColor = getSelectedColor(
        document.querySelector(".product__color--selected")
      );

      useColorToCheckSizeStock();

      const calculateNumber = document.querySelector(".quantity");
      quantityNumber = 1;
      calculateNumber.innerHTML = quantityNumber;

      getStock();
    });
  }
}

function selectProductSize() {
  const sizeArry = document.querySelectorAll(".product__size");
  selectedSize = document.querySelector(".product__size--selected").innerHTML;
  for (let i = 0; i < sizeArry.length; i++) {
    sizeArry[i].addEventListener("click", () => {
      for (let index = 0; index < sizeArry.length; index++) {
        if (
          sizeArry[index].className == "product__size product__size--disabled"
        ) {
          sizeArry[index].className = "product__size product__size--disabled";
        } else {
          sizeArry[index].className = "product__size";
        }
      }
      sizeArry[i].className += " product__size--selected";
      selectedSize = getSelectedSize();

      const calculateNumber = document.querySelector(".quantity");
      quantityNumber = 1;
      calculateNumber.innerHTML = quantityNumber;

      getStock();
    });
  }
}

function getSelectedColor(color) {
  let rgb = color.style.backgroundColor;
  rgb = rgb
    .substring(4, rgb.length - 1)
    .replace(/ /g, "")
    .split(",");
  function rgbToHex(r, g, b) {
    return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  return rgbToHex(
    parseInt(rgb[0], 10),
    parseInt(rgb[1], 10),
    parseInt(rgb[2], 10)
  ).toUpperCase();
}

function getSelectedSize() {
  const selectedSize = document.querySelector(".product__size--selected");
  return selectedSize.innerHTML;
}

getProductAPI();

function useColorToCheckSizeStock() {
  const sizeArry = document.querySelectorAll(".product__size");
  for (let i = 0; i < pVariants.length; i++) {
    if (pVariants[i].color_code == selectedColor.toUpperCase()) {
      stock = pVariants[i].stock;
      if (pVariants[i].stock == 0) {
        for (let x = 0; x < sizeArry.length; x++) {
          if (sizeArry[x].innerHTML == pVariants[i].size) {
            sizeArry[x].className = "product__size product__size--disabled";
            sizeArry[x].style.pointerEvents = "none";

            const activeSelection = document.querySelector(
              ".product__size--selected"
            );
            if (activeSelection) {
              // leave it
            } else if (x == 0) {
              sizeArry[x + 1].className =
                "product__size product__size--selected";
              selectedSize = sizeArry[x + 1].innerHTML;
            } else {
              sizeArry[x - 1].className =
                "product__size product__size--selected";
              selectedSize = sizeArry[x - 1].innerHTML;
            }
          }
        }
      }
    }
  }
}

let cartArry = [];

function addProductToCart() {
  getStock();
  const addProductToCart = document.querySelector("#add-to-cart");
  addProductToCart.addEventListener("click", () => {
    let addToCartColor = document.querySelector(".product__color--selected");
    let addToCartId = document.querySelector(".product__id");
    let addToCartImage = document.querySelector(".product__main-image");
    let addToCartName = document.querySelector(".product__title");
    let addToCartPrice = document.querySelector(".product__price");
    let addToCartqty = quantityNumber;
    let addToCartSize = document.querySelector(".product__size--selected");

    const item = {
      id: parseInt(addToCartId.innerHTML),
      name: addToCartName.innerHTML,
      price: parseInt(addToCartPrice.innerHTML.slice(5), 10),
      color: {
        code: getSelectedColor(addToCartColor),
        name: addToCartColor.getAttribute("id"),
      },
      size: addToCartSize.innerHTML,
      qty: addToCartqty,
      image: addToCartImage.getAttribute("src"),
      stock: stock,
    };

    if (JSON.parse(localStorage.getItem("cart")) == undefined) {
      cartArry.push(item);
      productPageCartNumber = 1;

      productPageCart.textContent = productPageCartNumber;
      productPageCartMobile.textContent = productPageCartNumber;
      localStorage.setItem("cart", JSON.stringify(cartArry));

      alert("已加入購物車");
      cartArry = JSON.parse(localStorage.getItem("cart"));
      productPageCart.textContent = productPageCartNumber;
      productPageCartMobile.textContent = productPageCartNumber;
    } else {
      productPageCartNumber = JSON.parse(localStorage.getItem("cart")).length;
      let index;
      cartArry = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < cartArry.length; i++) {
        if (
          cartArry[i].color.code == item.color.code &&
          cartArry[i].size == item.size &&
          cartArry[i].id == item.id
        ) {
          index = i;
        }
      }
      if (index >= 0) {
        cartArry = JSON.parse(localStorage.getItem("cart"));
        cartArry[index].qty = item.qty;
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(cartArry));
        alert("已加入購物車");
      } else {
        productPageCartNumber = productPageCartNumber + 1;
        cartArry = JSON.parse(localStorage.getItem("cart"));
        cartArry.push(item);
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(cartArry));
        alert("已加入購物車");
      }

      productPageCart.textContent = productPageCartNumber;
      productPageCartMobile.textContent = productPageCartNumber;
    }
  });
}
