let cartList = JSON.parse(localStorage.getItem("cart"));
const CURRENCY = "NT. ";
const FREIGHT = 60;

if (JSON.parse(localStorage.getItem("cart"))) {
  cartList = JSON.parse(localStorage.getItem("cart"));
} else {
  cartList = [];
}

function createHTMLStructure() {
  const childrenOfCart = [
    "header",
    "items",
    "shipment",
    "reminder",
    "form-header",
    "form",
    "form-header",
    "form",
    "summary",
  ];
  for (let i = 0; i < childrenOfCart.length; i++) {
    let div = document.createElement("div");
    div.className = childrenOfCart[i];
    document.querySelector("#shopping-Cart").appendChild(div);
  }

  // Header
  const childrenOfHeader = [
    "title",
    "item__quantity",
    "item__price",
    "item__subtotal",
    "item__remove",
  ];
  for (let i = 0; i < childrenOfHeader.length; i++) {
    let div = document.createElement("div");
    div.className = childrenOfHeader[i];
    document.querySelector(".header").appendChild(div);
  }
  document.querySelector(".title").innerHTML = `購物車(${cartList.length})`;
  document.querySelector(".item__quantity").innerHTML = `數量`;
  document.querySelector(".item__price").innerHTML = `單價`;
  document.querySelector(".item__subtotal").innerHTML = `小計`;

  // Items
  for (let i = 0; i < cartList.length; i++) {
    let div = document.createElement("div");
    div.className = "item";
    document.querySelector(".items").appendChild(div);
  }

  const e = document.createElement("div");
  e.className = "no-product";
  document.querySelector(".items").appendChild(e);
  const noProduct = document.querySelector(".no-product");
  noProduct.innerHTML = "購物車很空捏";
  if (cartList.length > 0) {
    noProduct.style.display = "none";
  }

  // Item
  const productsColumn = document.querySelectorAll(".item");
  for (let x = 0; x < productsColumn.length; x++) {
    const childrenOfItem = [
      {
        className: "item__image",
        tagtype: "img",
      },
      {
        className: "item__detail",
        tagtype: "div",
      },
      {
        className: "item__quantity",
        tagtype: "div--mobile",
      },
      {
        className: "item__price",
        tagtype: "div--mobile",
      },
      {
        className: "item__subtotal",
        tagtype: "div--mobile",
      },
      {
        className: "item__remove",
        tagtype: "img--remove",
      },
    ];
    for (let i = 0; i < childrenOfItem.length; i++) {
      if (childrenOfItem[i].tagtype === "img") {
        let img = document.createElement("img");
        img.className = childrenOfItem[i].className;
        productsColumn[x].appendChild(img);
      } else {
        let div = document.createElement("div");
        div.className = childrenOfItem[i].className;
        productsColumn[x].appendChild(div);
        if (childrenOfItem[i].tagtype === "div--mobile") {
          const mobileText = ["數量", "單價", "小計"];
          let divText = document.createElement("div");
          divText.className = "mobile-text";
          divText.innerHTML = mobileText[i - 2];

          div.appendChild(divText);
        } else if (childrenOfItem[i].tagtype === "img--remove") {
          let img = document.createElement("img");
          div.appendChild(img);
        }
      }
    }
  }

  // Item Detail
  const itemDetailColumn = document.querySelectorAll(".item__detail");
  for (let x = 0; x < itemDetailColumn.length; x++) {
    const childrenOfItemDetail = [
      "item__name",
      "item__id",
      "item__color",
      "item__size",
    ];
    for (let i = 0; i < childrenOfItemDetail.length; i++) {
      let div = document.createElement("div");
      div.className = childrenOfItemDetail[i];
      itemDetailColumn[x].appendChild(div);
    }
  }

  // Item Quantity
  const itemQtyCol = document.querySelectorAll(".item .item__quantity");
  for (let x = 0; x < itemQtyCol.length; x++) {
    let select = document.createElement("select");
    itemQtyCol[x].appendChild(select);
    for (let i = 0; i < parseInt(cartList[x].stock); i++) {
      let option = document.createElement("option");
      option.setAttribute("value", i + 1);
      option.innerHTML = i + 1;
      select.appendChild(option);
    }
  }

  // Shipment
  const childrenOfShipment = ["配送國家", "付款方式"];
  const ShipmentOptions = ["台灣及離島", "信用卡付款"];
  for (let i = 0; i < 2; i++) {
    let div = document.createElement("div");
    div.className = "shipment__name";
    div.innerHTML = childrenOfShipment[i];
    let select = document.createElement("select");
    select.className = "shipment__select";
    document.querySelector(".shipment").appendChild(div);
    document.querySelector(".shipment").appendChild(select);
    let option = document.createElement("option");
    option.innerHTML = ShipmentOptions[i];
    select.appendChild(option);
  }

  // Reminder
  document.querySelector(
    ".reminder"
  ).innerHTML = `※ 提醒您： <br />  ● 選擇宅配-請填寫正確收件人資訊，避免包裹配送不達 <br />  ● 選擇超商-請填寫正確收件人姓名(與證件相符)，避免無法領取`;

  // Form Header
  const formHeaders = ["訂購資料", "付款資料"];
  const formHeadersSections = document.querySelectorAll(".form-header");
  const formSections = document.querySelectorAll(".form");

  for (let i = 0; i < formHeadersSections.length; i++) {
    formHeadersSections[i].innerHTML = formHeaders[i];

    // Form
    if (i == 0) {
      const fieldNames = [
        {
          className: "收件人姓名",
          inputType: "text",
        },
        {
          className: "Email",
          inputType: "text",
        },
        {
          className: "手機號碼",
          inputType: "text",
        },
        {
          className: "收件地址",
          inputType: "text",
        },
        {
          className: "配送時間",
          inputType: "radio",
        },
      ];
      const fieldFor = ["name", "email", "phone", "address", "time"];
      for (let x = 0; x < fieldNames.length; x++) {
        let div = document.createElement("div");
        div.className = "field";
        formSections[i].appendChild(div);
        let label = document.createElement("label");
        label.className = "field__name";
        label.setAttribute("for", fieldFor[x]);
        label.innerHTML = fieldNames[x].className;
        div.appendChild(label);
        let divInput = document.createElement("div");
        divInput.className = "field__input";
        div.appendChild(divInput);
        if (fieldNames[x].inputType === "text") {
          // 要改
          let input = document.createElement("input");
          input.setAttribute("id", fieldFor[x]);
          input.setAttribute("type", "text");
          divInput.appendChild(input);
        } else if (fieldNames[x].inputType === "radio") {
          const timeOption = {
            id: ["morning", "afternoon", "anytime"],
            time: ["08:00-12:00", "14:00-18:00", "不指定"],
          };
          for (let v = 0; v < timeOption.id.length; v++) {
            let input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("value", timeOption.id[v]);
            input.setAttribute("id", timeOption.id[v]);
            input.setAttribute("name", "time");
            input.className = "time";
            divInput.appendChild(input);
            let label = document.createElement("label");
            label.setAttribute("for", timeOption.id[v]);
            label.innerHTML = timeOption.time[v];
            divInput.appendChild(label);
          }
        }
      }
    } else {
      const fieldNames = ["信用卡號碼", "有效期限", "安全碼"];
      const fieldFor = ["card", "expire", "ccv"];
      const id = ["card-number", "card-expiration-date", "card-ccv"];
      for (let x = 0; x < fieldNames.length; x++) {
        let div = document.createElement("div");
        div.className = "field";
        formSections[i].appendChild(div);
        let label = document.createElement("label");
        label.className = "field__name";
        label.setAttribute("for", fieldFor[x]);
        label.innerHTML = fieldNames[x];
        div.appendChild(label);
        let divInput = document.createElement("div");
        divInput.className = "tpfield";
        divInput.id = id[x];
        div.appendChild(divInput);
      }
    }
  }

  document.querySelector("#morning").setAttribute("checked", "checked");

  let span = document.createElement("span");
  span.className = "field__reminder";
  span.innerHTML = "務必填寫完整收件人姓名，避免包裹無法順利簽收";
  formSections[0].appendChild(span);
  document.querySelectorAll(".field")[0].after(span);

  // Summary
  const childrenOfSummary = {
    class: ["subtotal", "freight", "total"],
    name: ["總金額", "運費", "應付金額"],
  };
  for (let i = 0; i < childrenOfSummary.class.length; i++) {
    let div = document.createElement("div");
    div.className = childrenOfSummary.class[i];
    div.id = childrenOfSummary.class[i];
    document.querySelector(".summary").appendChild(div);
    let divName = document.createElement("div");
    divName.className = "name";
    divName.innerHTML = childrenOfSummary.name[i];
    div.appendChild(divName);
    let divValue = document.createElement("div");
    divValue.className = "value";
    divValue.innerHTML = `${CURRENCY}`;
    div.appendChild(divValue);
    let span = document.createElement("span");
    divValue.appendChild(span);
  }
  let button = document.createElement("button");
  button.id = "checkout";
  button.innerHTML = "確認付款";
  document.querySelector(".summary").appendChild(button);
}
createHTMLStructure();

function renderCartListData() {
  const itemImage = document.querySelectorAll(".item__image");
  const itemName = document.querySelectorAll(".item__name");
  const itemId = document.querySelectorAll(".item__id");
  const itemColor = document.querySelectorAll(".item__color");
  const itemSize = document.querySelectorAll(".item__size");
  const itemQuantity = document.querySelectorAll(
    ".item .item__quantity select"
  );
  const itemPrice = document.querySelectorAll(".item .item__price");
  const itemSubtotal = document.querySelectorAll(".item .item__subtotal");
  const itemRemove = document.querySelectorAll(".item .item__remove img");
  const itemSummarySubtotal = document.querySelectorAll(".value span")[0];
  const itemSummaryFreight = document.querySelectorAll(".value span")[1];
  const itemSummaryTotal = document.querySelectorAll(".value span")[2];

  for (let i = 0; i < cartList.length; i++) {
    itemImage[i].setAttribute("src", `${cartList[i].image}`);
    itemName[i].innerHTML = `${cartList[i].name}`;
    itemId[i].innerHTML = `${cartList[i].id}`;
    itemColor[i].innerHTML = `顏色 | ${cartList[i].color.name}`;
    itemSize[i].innerHTML = `尺寸 | ${cartList[i].size}`;
    itemQuantity[i].value = cartList[i].qty;
    itemPrice[i].innerHTML += `${CURRENCY}${cartList[i].price}`;
    itemSubtotal[i].innerHTML += `${CURRENCY}${
      cartList[i].qty * cartList[i].price
    }`;
    itemRemove[i].setAttribute("src", "./img/cart-remove.png");
    itemSummarySubtotal.innerHTML = calcSummaryTotal();
    itemSummaryFreight.innerHTML = FREIGHT;
    itemSummaryTotal.innerHTML =
      calcSummaryTotal() + parseInt(itemSummaryFreight.innerHTML, 10);
  }

  registerQtyChangeEvent();
}

if (cartList.length > 0) {
  renderCartListData();
} else {
  const itemSummarySubtotal = document.querySelectorAll(".value span")[0];
  const itemSummaryFreight = document.querySelectorAll(".value span")[1];
  const itemSummaryTotal = document.querySelectorAll(".value span")[2];
  itemSummarySubtotal.innerHTML = 0;
  itemSummaryFreight.innerHTML = FREIGHT;
  itemSummaryTotal.innerHTML = 0;
}

// Event Listener
function registerQtyChangeEvent() {
  const quantitySelector = document.querySelectorAll(".item__quantity select");
  const itemSubtotal = document.querySelectorAll(".item .item__subtotal");

  for (let i = 0; i < quantitySelector.length; i++) {
    quantitySelector[i].addEventListener("change", () => {
      itemSubtotal[i].innerHTML = "";
      const div = document.createElement("div");
      div.className = "mobile-text";
      div.innerHTML = "小計";
      itemSubtotal[i].appendChild(div);
      itemSubtotal[i].innerHTML += `${CURRENCY}${
        quantitySelector[i].value * cartList[i].price
      }`;

      const itemSummarySubtotal = document.querySelectorAll(".value span")[0];
      const itemSummaryFreight = document.querySelectorAll(".value span")[1];
      const itemSummaryTotal = document.querySelectorAll(".value span")[2];
      itemSummarySubtotal.innerHTML = calcSummaryTotal();
      itemSummaryTotal.innerHTML =
        calcSummaryTotal() + parseInt(itemSummaryFreight.innerHTML, 10);
    });
  }
}

function calcSummaryTotal() {
  const itemSubtotal = document.querySelectorAll(".item__subtotal");
  let sum = 0;
  for (let i = 1; i < itemSubtotal.length; i++) {
    let subtotal = parseInt(itemSubtotal[i].innerText.replace(/[^0-9]/g, ""));
    sum += subtotal;
  }
  return sum;
}

// Delete Item
const itemRemove = document.querySelectorAll(".item .item__remove");
cartList = JSON.parse(localStorage.getItem("cart"));

if (cartList) {
  for (let i = 0; i < cartList.length; i++) {
    const itemColumn = document.querySelectorAll(".item");
    const itemId = document.querySelectorAll(".item__id");
    const itemColor = document.querySelectorAll(".item__color");
    const itemSize = document.querySelectorAll(".item__size");

    itemRemove[i].addEventListener("click", () => {
      itemColumn[i].remove();
      alert("已從購物車移除");

      for (let v = 0; v < cartList.length; v++) {
        if (
          parseInt(itemId[i].innerHTML) == cartList[v].id &&
          itemColor[i].innerHTML == `顏色 | ${cartList[v].color.name}` &&
          itemSize[i].innerHTML == `尺寸 | ${cartList[v].size}`
        ) {
          cartList.splice(v, 1);
        }
      }

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(cartList));

      registerQtyChangeEvent();

      const itemSummarySubtotal = document.querySelectorAll(".value span")[0];
      const itemSummaryFreight = document.querySelectorAll(".value span")[1];
      const itemSummaryTotal = document.querySelectorAll(".value span")[2];
      itemSummarySubtotal.innerHTML = calcSummaryTotal();
      itemSummaryTotal.innerHTML =
        calcSummaryTotal() + parseInt(itemSummaryFreight.innerHTML, 10);
      document.querySelector(".title").innerHTML = `購物車(${cartList.length})`;

      const cart = document.querySelector("#cart-number");
      const cartMobile = document.querySelector(
        ".mobile-shopping-cart #cart-number"
      );
      cart.textContent = cartList.length;
      cartMobile.textContent = cartList.length;

      if (cartList.length === 0) {
        const noProduct = document.querySelector(".no-product");
        noProduct.style.display = "block";
      }
    });
  }
}
