const loginFormHandler=async e=>{e.preventDefault();const o=document.querySelector("#email-login").value.trim(),t=document.querySelector("#password-login").value.trim();if(o&&t){const e=await fetch("/api/users/login",{method:"POST",body:JSON.stringify({email:o,password:t}),headers:{"Content-Type":"application/json"}});e.ok?document.location.replace("/"):alert(e.statusText)}};document.querySelector(".login-form").addEventListener("submit",loginFormHandler);