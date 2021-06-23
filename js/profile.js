const logoutButton = document.querySelector(".logout");
let accessTokenProfile;
let returnTokenProfile;
const memberProfileImg = document.querySelector("#member-profile-img");
const memberName = document.querySelector("#member-name");
const memberEmail = document.querySelector("#member-email");

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

function checkLoginStatus() {
  window.FB.getLoginStatus(function (response) {
    if (response.status === "connected") {
      accessTokenProfile = response.authResponse.accessToken;
      renderProfilePage(accessTokenProfile);

      setTimeout(function () {
        const loader = document.querySelector(".loader");
        loader.style.display = "none";
        const member = document.querySelector("#member");
        member.style.display = "flex";
        const logout = document.querySelector(".logout");
        logout.style.display = "block";
      }, 3000);
    } else {
      window.location.href = "index.html";
    }
  });
}

async function postAPI(token) {
  return await fetch(`https://api.appworks-school.tw/api/1.0/user/signin`, {
    method: "POST",
    body: JSON.stringify({
      provider: "facebook",
      access_token: `${token}`,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
}

async function renderProfilePage(token) {
  let userData = await postAPI(token);
  let { email, name, picture } = userData.data.user;
  // eslint-disable-next-line no-unused-vars
  returnTokenProfile = userData.data.access_token;

  memberProfileImg.setAttribute("src", picture);
  memberName.innerHTML = name;
  memberEmail.innerHTML = email;
}

logoutButton.addEventListener("click", () => {
  window.FB.logout(function () {
    memberName.innerHTML = "";
    memberEmail.innerHTML = "";
    memberProfileImg.src = "";
    window.location.href = "index.html";
  });
});
