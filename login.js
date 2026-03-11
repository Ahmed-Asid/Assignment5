function login() {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  
  const username = usernameInput.value;
  const password = passwordInput.value;
  
  const correctUser = "admin";
  const correctPass = "admin123";
  
  if (username === correctUser && password === correctPass) {
    window.location.href = "main.html";
  } else {
    alert("Invalid username or password");
    
    usernameInput.value = "";
    passwordInput.value = "";
    usernameInput.focus();
  }
}