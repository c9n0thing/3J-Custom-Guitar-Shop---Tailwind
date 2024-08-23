const togglePassword = document.getElementById('togglePassword');
    const password = document.getElementById('password');
    
    togglePassword.addEventListener('click', function() {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        this.querySelector('ion-icon').setAttribute('name', type === 'password' ? 'eye' : 'eye-off');
    });
    document.getElementById("Showsignup").addEventListener("click", function() {
        document.getElementById("signin").classList.add("hidden");
        document.getElementById("signup").classList.remove("hidden");
      });

      document.getElementById("showSignin").addEventListener("click", function() {
        document.getElementById("signup").classList.add("hidden");
        document.getElementById("signin").classList.remove("hidden");
      });