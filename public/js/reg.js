console.log(`111`);
document.getElementById("registrationForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const termsCheckbox = document.getElementById("termsCheckbox").checked;

  // Use regular expressions to validate input fields
  const regUname = /^[a-zA-Z0-9-_]{4,10}$/ 
  const regPassword = /^[a-zA-Z0-9-_]{6,10}$/ 

  if (!regUname.test(username)) {
    alert(`Username must be 4-10 characters long and can include letters, numbers, dashes, and underscores.`)
    return
  } 

  if (!regPassword.test(password)) {
    alert(`Password must be 6-10 characters long and can include letters, numbers, dashes, and underscores.`)
    return
  } 

  if (!termsCheckbox) {
      alert("Please agree to the terms to register.");
      return;
  }

  if (password !== confirmPassword) {
      alert("Passwords must match.");
      return;
  }

  this.submit();
});