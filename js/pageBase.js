const mobileSearchIcon = document.querySelector(".mobile-search-icon");
const mobileSearchColumn = document.querySelector(
  ".mobile-combined-search-column"
);
const topHeader = document.querySelector(".top");
let activeToken;
let returnToken;

mobileSearchIcon.addEventListener("click", () => {
  if (window.getComputedStyle(mobileSearchColumn).display === "none") {
    mobileSearchColumn.style.display = "block";
  }
});

topHeader.addEventListener("click", () => {
  if (window.getComputedStyle(mobileSearchColumn).display === "block") {
    mobileSearchColumn.style.display = "none";
  }
});

// update the number of cart
const cart = document.querySelector("#cart-number");
const cartMobile = document.querySelector(".mobile-shopping-cart #cart-number");
let cartNumber = 0;

if (JSON.parse(localStorage.getItem("cart")) != undefined) {
  cartNumber = JSON.parse(localStorage.getItem("cart")).length;
  cart.innerHTML = cartNumber;
  cartMobile.innerHTML = cartNumber;
}

// FaceBook

//初始化
window.fbAsyncInit = function () {
  window.FB.init({
    appId: 2322738031190748,
    cookie: true,
    xfbml: true,
    version: "v10.0",
  });
  //記錄用戶行為資料 可在後台查看用戶資訊
  window.FB.AppEvents.logPageView();
  checkLoginStatus();
};
//嵌入臉書sdk
(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");

const userButton = [
  document.querySelector(".mobile-member"),
  document.querySelector(".member"),
];

//點擊登入按鈕
userButton.forEach((element) =>
  element.addEventListener("click", () => {
    //檢查臉書登入狀態
    window.FB.getLoginStatus(function (response) {
      //如果已經有授權過應用程式
      if (response.status === "connected") {
        window.FB.api(
          "/me",
          { fields: "id,name,email" }
          // function (response) {}
        );
        document.location.href = "./profile.html";

        //沒授權過應用程式
      } else {
        //呼叫FB.login()請求使用者授權
        window.FB.login(
          function (response) {
            if (response.authResponse) {
              window.FB.api(
                "/me",
                { fields: "id,name,email" }
                // function (response) {}
              );
              checkLoginStatus();
            }
          },
          { scope: "email", auth_type: "rerequest" }
        );
      }
    });
  })
);

function checkLoginStatus() {
  window.FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      activeToken = response.authResponse.accessToken;
    }
  });
  postAPI(activeToken);
}

async function postAPI(token) {
  if (activeToken) {
    return await fetch(`https://api.appworks-school.tw/api/1.0/user/signin`, {
      method: "POST",
      body: JSON.stringify({
        provider: "facebook",
        access_token: `${token}`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // eslint-disable-next-line no-unused-vars
        returnToken = result.data.access_token;
      });
  }
}
