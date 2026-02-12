document.addEventListener("DOMContentLoaded", function () {

    /* =====================
       LOGIN CHECK (APPLY LOAN PAGE)
    ===================== */
    const loanForm = document.getElementById("loanForm");
    const loginModal = document.getElementById("loginModal");

    if (loanForm) {
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        if (!isLoggedIn) {
            if (loginModal) {
                loginModal.style.display = "flex";
            }
            loanForm.style.display = "none";
        }
    }

    /* =====================
       PASSWORD VALIDATION (REGISTER PAGE ONLY)
    ===================== */
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");
    const passwordError = document.getElementById("password-error");
    const errorMsg = document.getElementById("error-msg");

    function isStrongPassword(value) {
        return (
            value.length >= 8 &&
            /[A-Z]/.test(value) &&
            /[a-z]/.test(value) &&
            /[0-9]/.test(value) &&
            /[@#$%!]/.test(value)
        );
    }

    if (password && confirmPassword) {
        password.addEventListener("input", () => {
            if (password.value === "") {
                passwordError.style.display = "none";
            } else if (!isStrongPassword(password.value)) {
                passwordError.style.display = "block";
            } else {
                passwordError.style.display = "none";
            }
        });

        confirmPassword.addEventListener("input", () => {
            if (password.value !== confirmPassword.value) {
                errorMsg.textContent = "Passwords do not match!";
                errorMsg.style.display = "block";
            } else {
                errorMsg.style.display = "none";
            }
        });
    }

    /* =====================
       USER ICON + DROPDOWN
    ===================== */
    const userIcon = document.getElementById("userIcon");
    const logoutMenu = document.getElementById("logoutMenu");

    if (userIcon && logoutMenu) {
        userIcon.addEventListener("click", () => {
            logoutMenu.classList.toggle("show");
        });

        document.addEventListener("click", (e) => {
            if (!userIcon.contains(e.target) && !logoutMenu.contains(e.target)) {
                logoutMenu.classList.remove("show");
            }
        });
    }
});

/* =====================
   MODAL CLOSE (GLOBAL)
===================== */
window.closeModal = function () {
    const modal = document.getElementById("successModal");
    if (modal) modal.style.display = "none";
};

/* =====================
   REDIRECT TO LOGIN
===================== */
window.redirectToLogin = function () {
    window.location.href = "login.html";
};

/* =====================
   LOGOUT
===================== */
window.logout = function () {
    localStorage.clear();
    window.location.href = "login.html";
};

/* =====================
   TOGGLE USER MENU
===================== */
function toggleMenu() {
    const menu = document.querySelector(".user-menu");
    if (menu) menu.classList.toggle("show");
}
