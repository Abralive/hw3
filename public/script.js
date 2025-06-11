document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // 登入邏輯
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const account = loginForm.querySelector("input[type='text']").value.trim();
            const password = loginForm.querySelector("input[type='password']").value;

            fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account, password })
            })
                .then((res) => res.text())
                .then((msg) => {
                    alert(msg);
                    if (msg.includes("登入成功")) {
                        window.location.href = "warn.html"; // ✅ 跳轉到宣導頁
                    }
                })
                .catch((err) => alert("錯誤: " + err));
        });
    }

    // 註冊邏輯
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const account = registerForm.querySelector("input[type='text']").value.trim();
            const password = registerForm.querySelector("input[type='password']").value;

            fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account, password })
            })
                .then((res) => res.text())
                .then((msg) => alert(msg))
                .catch((err) => alert("錯誤: " + err));
        });
    }

    const helpIcon = document.querySelector(".help-icon");
    if (helpIcon) {
        helpIcon.addEventListener("click", function () {
            alert("密碼需為 4~12 字元，區分大小寫，建議避免生日等簡單密碼。")
        });
    }
});
