document.addEventListener("DOMContentLoaded", () => {
  const registration_from = document.getElementById("registration-from");
  const usernameReg = document.getElementById("username");
  const emailReg = document.getElementById("email");
  const passwordReg = document.getElementById("password");
  const registerBtn = document.getElementById("registerFrom");
  const loginlink = document.getElementById("login");
  const loginPage = document.getElementById("loginPage");
  const loginEmail = document.getElementById("loginEmail");
  const loginPassword = document.getElementById("loginPassword");
  const loginUser = document.getElementById("loginUser");
  const deletePage = document.getElementById("delete_account_page");
  const deletelink = document.getElementById("deleteAccount");
  const delEmail = document.getElementById("delEmail");
  const delPassword = document.getElementById("delPassword");
  const deleteUser = document.getElementById("deleteAcc");
  const editpage = document.getElementById("EditPage");
  const updateUsername = document.getElementById("updateUsername");
  const updateEmail = document.getElementById("updateEmail");
  const openUpdatePage = document.getElementById("UpdateProfile");
  const updateBtn = document.querySelector("#updateInfo");
  const pathUpdatePage = document.getElementById("OpenUpdatePage");

  let reqEmail = "";
  registerBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    // this going to make request in the backend
    try {
      const res = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: usernameReg.value.trim(),
          password: passwordReg.value.trim(),
          email: emailReg.value.trim(),
        }),
      });

      const data = await res.json();
      alert(data.message);
      usernameReg.value = "";
      emailReg.value = "";
      passwordReg.value = "";
    } catch (error) {
      alert("error : ", error.message);
    }
  });

  loginlink.addEventListener("click", () => {
    registration_from.classList.add("hidden");
    loginPage.classList.remove("hidden");
    deletePage.classList.add("hidden");
    deletelink.classList.add("hidden");
  });

  deletelink.addEventListener("click", () => {
    registration_from.classList.add("hidden");
    loginPage.classList.add("hidden");
    deletePage.classList.remove("hidden");
    deletelink.classList.add("hidden");
    openUpdatePage.classList.add('hidden');
  });

  loginUser.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: loginEmail.value.trim(),
          password: loginPassword.value.trim(),
        }),
      });
      const data = await res.json();
      alert(data.message);
      reqEmail = loginEmail.value.trim();
      loginEmail.value = "";
      loginPassword.value = "";
      if (res.ok) {
        deletelink.classList.remove('hidden');
        pathUpdatePage.classList.remove("hidden");
        loginPage.classList.add("hidden");
      }
    } catch (error) {
      alert(`ERROR : ${error.message}`);
    }
  });

  deleteUser.addEventListener("click", async function (e) {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          email: delEmail.value.trim(),
          password: delPassword.value.trim(),
        }),
      });

      const data = await res.json();
      alert(data.message);
      delEmail.value = "";
      delPassword.value = "";
      if(res.ok){
        deletePage.classList.add('hidden');
        registration_from.classList.remove('hidden');
      }
    } catch (error) {
      alert("ERROR : ", error.message);
    }
  });

  openUpdatePage.addEventListener("click", () => {
    loginPage.classList.add("hidden");
    registration_from.classList.add("hidden");
    deletePage.classList.add("hidden");
    editpage.classList.remove("hidden");
    openUpdatePage.classList.add("hidden");
  });

  updateBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/user/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: reqEmail,
          newusername: updateUsername.value.trim(),
          newemail: updateEmail.value.trim(),
        }),
      });
      const data = await res.json();
      updateUsername.value = "";
      updateEmail.value = "";
      reqEmail = "";
      alert(data.message);
    } catch (error) {
      alert("ERROR : ", error.message);
    }
  });
});
