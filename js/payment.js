const checkoutButton = document.querySelector("#checkout");
let checkoutCartList = JSON.parse(localStorage.getItem("cart"));
let cardPrime;
let paymentInfo;
let orderNumber;

// Create payment section
const fields = {
  number: {
    element: "#card-number",
    placeholder: "**** **** **** ****",
  },
  expirationDate: {
    element: document.getElementById("card-expiration-date"),
    placeholder: "MM / YY",
  },
  ccv: {
    element: "#card-ccv",
    placeholder: "後三碼",
  },
};

window.TPDirect.card.setup({
  fields: fields,
  styles: {
    input: {
      color: "gray",
    },
    "input.cvc": {
      "font-size": "14px",
    },
    "input.expiration-date": {
      "font-size": "14px",
    },
    "input.card-number": {
      "font-size": "14px",
    },
    ":focus": {
      color: "black",
    },
    ".valid": {
      color: "green",
    },
    ".invalid": {
      color: "red",
    },
    "@media screen and (max-width: 400px)": {
      input: {
        color: "orange",
      },
    },
  },
});

window.TPDirect.card.onUpdate(function (update) {
  // update.canGetPrime === true
  // --> you can call TPDirect.card.getPrime()
  if (update.canGetPrime) {
    // Enable submit Button to get prime.
    // submitButton.removeAttribute('disabled')
  } else {
    // Disable submit Button to get prime.
    // submitButton.setAttribute('disabled', true)
  }

  // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
  if (update.cardType === "visa") {
    // Handle card type visa.
  }

  // number 欄位是錯誤的
  if (update.status.number === 2) {
    // setNumberFormGroupToError()
  } else if (update.status.number === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }

  if (update.status.expiry === 2) {
    // setNumberFormGroupToError()
  } else if (update.status.expiry === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }

  if (update.status.cvc === 2) {
    // setNumberFormGroupToError()
  } else if (update.status.cvc === 0) {
    // setNumberFormGroupToSuccess()
  } else {
    // setNumberFormGroupToNormal()
  }
});

window.TPDirect.card.getTappayFieldsStatus();

checkoutButton.addEventListener("click", onSubmit);
function onSubmit(event) {
  event.preventDefault();

  // 取得 TapPay Fields 的 status
  const tappayStatus = window.TPDirect.card.getTappayFieldsStatus();

  const fieldInput = document.querySelectorAll(".field__input input");
  const recentCartList = JSON.parse(localStorage.getItem("cart"));
  let fieldCheck = false;

  if (!recentCartList || recentCartList.length === 0) {
    alert("購物車還是空的喔");
  } else if (!fieldInput[0].value) {
    alert("請輸入收件人姓名");
  } else if (!validateEmail(fieldInput[1].value)) {
    alert("Email有誤");
  } else if (
    !fieldInput[2].value ||
    !fieldInput[2].value.match(/^(09)[0-9]{8}$/)
  ) {
    alert("手機有誤");
  } else if (!fieldInput[3].value) {
    alert("請輸入收件地址");
    return;
  } else {
    fieldCheck = true;
  }

  // 確認是否可以 getPrime
  if (tappayStatus.canGetPrime === false && fieldCheck) {
    alert("請輸入正確的信用卡資訊");
    return;
  }

  // Get prime
  window.TPDirect.card.getPrime((result) => {
    if (result.status !== 0) {
      // alert("get prime error " + result.msg);
      return;
    }
    cardPrime = result.card.prime;
    // eslint-disable-next-line no-undef
    if (returnToken === undefined) {
      alert("請先登入會員");
    } else {
      constructCheckOutInfo();
      getAPICheckOutResult();
    }
  });
}

function constructCheckOutInfo() {
  const timeArry = document.querySelectorAll(".time");
  let shipmentTime;
  for (let i = 0; i < timeArry.length; i++) {
    if (timeArry[i].checked) {
      shipmentTime = timeArry[i].id;
    }
  }
  const checkOutList = [];

  checkoutCartList.forEach((item) => {
    const product = {
      id: `${item.id}`,
      name: item.name,
      price: item.price,
      color: {
        name: item.color.name,
        code: item.color.code,
      },
      size: item.size,
      qty: item.qty,
    };
    checkOutList.push(product);
  });

  paymentInfo = {
    prime: `${cardPrime}`,
    order: {
      shipping: "delivery",
      payment: "credit_card",
      subtotal: parseInt(
        document.querySelector(".summary .subtotal span").innerText
      ),
      freight: parseInt(
        document.querySelector(".summary .freight span").innerText
      ),
      total: parseInt(document.querySelector(".summary .total span").innerText),
      recipient: {
        name: document.querySelector("#name").value,
        phone: document.querySelector("#phone").value,
        email: document.querySelector("#email").value,
        address: document.querySelector("#address").value,
        time: shipmentTime,
      },
      list: checkOutList,
    },
  };
  return;
}

// Get Checkout result from API
function getAPICheckOutResult() {
  // eslint-disable-next-line no-undef

  fetch(`https://api.appworks-school.tw/api/1.0/order/checkout`, {
    method: "POST",
    body: JSON.stringify(paymentInfo),
    headers: {
      "Content-Type": "application/json",
      // eslint-disable-next-line no-undef
      Authorization: `Bearer ${returnToken}`,
    },
  })
    .then((res) => res.json())
    .then((result) => {
      orderNumber = result.data.number;
      localStorage.removeItem("cart");
      window.location.href = `thankyou.html?number=${orderNumber}`;
    });
}

function validateEmail(mail) {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
}
