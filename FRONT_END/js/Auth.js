//signup
console.log("JS Loaded");

const registerForm = document.querySelector(".registercontainer form");

if (registerForm) {
  registerForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputs = registerForm.querySelectorAll("input");

    const userData = {
      name: inputs[0].value,
      username: inputs[1].value,
      password: inputs[2].value,
      email: inputs[3].value,
    };

    try {
      const res = await fetch(
        "https://resume-craft-8b70.onrender.com/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        },
      );

      const data = await res.json();

      showToast("Registration successful!", "success");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1000);
    } catch (error) {
      console.error(error);
      showToast("Error registering user", "error");
    }
  });
}

//login
const loginForm = document.getElementById("loginarea");
const notfound = document.getElementById("notfound");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const inputs = loginForm.querySelectorAll("input");

    const username = inputs[0].value;
    const password = inputs[1].value;

    try {
      const res = await fetch(
        "https://resume-craft-8b70.onrender.com/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("profile-id", data.user._id);
        localStorage.setItem("profile-name", data.user.name || "");
        localStorage.setItem("profile-email", data.user.email || "");
        localStorage.setItem("profile-course", data.user.course || "");
        localStorage.setItem("profile-branch", data.user.branch || "");
        localStorage.setItem("profile-year", data.user.year || "");

        showToast("Login Successful", "success");
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 1000);
      } else {
        notfound.innerText = data.message;
        notfound.style.display = "block";
      }
    } catch (error) {
      console.error(error);
      showToast("Server error", "error");
    }
  });
}
