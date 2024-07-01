
 
 document.querySelector("#loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.querySelector("#emailInput").value;
  const password = document.querySelector("#passInput").value;

  try {
    const response = await axios.post("/login", {
      email: email,
      password: password,
    });
    if (response.status === 200) {
      alert(response.data.message);
      window.location.assign("/home.html");
      console.log(response);
      return;
    }
  } catch (error) {
    console.log(error.response.data.message); // More specific error message
    console.log("error hai");
  }
});
