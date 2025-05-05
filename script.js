document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const accountInput = loginForm.querySelector("input[type='text']");
    const passwordInput = loginForm.querySelector("input[type='password']");

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const account = accountInput.value.trim();
        const password = passwordInput.value;

        if (!account || !password) {
            alert("請輸入帳號與密碼");
            return;
        }

        if (account === "demo@example.com" && password === "1234") {
            alert("登入成功！歡迎回來！");
            // 實際專案中這裡可以跳轉主頁
        } else {
            alert("登入失敗，帳號或密碼錯誤！");
        }
    });

    const helpIcon = document.querySelector(".help-icon");
    helpIcon.addEventListener("click", function () {
        alert("密碼需為 4~12 字元，區分大小寫，建議避免生日等簡單密碼。");
    });
});
