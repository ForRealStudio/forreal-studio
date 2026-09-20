const SUPABASE_URL = "https://bldqxuhkcnmxouwgvner.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_ukt5DGR_NxRdTFuVXRWahg_rA5qaONg";

const supabaseClient = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

// REJESTRACJA

const registerForm = document.getElementById("registerForm");
const registerMessage = document.getElementById("registerMessage");

if (registerForm) {

registerForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    registerMessage.textContent = "";

    if (password !== confirmPassword) {
        registerMessage.textContent =
            "Hasła nie są takie same.";
        return;
    }

    if (password.length < 6) {
        registerMessage.textContent =
            "Hasło musi mieć minimum 6 znaków.";
        return;
    }

    registerMessage.textContent =
        "Tworzenie konta...";

    const { data, error } =
        await supabaseClient.auth.signUp({
            email: email,
            password: password
        });

    if (error) {

        registerMessage.textContent =
            error.message;

        return;
    }

    registerMessage.textContent =
        "Konto utworzone! Sprawdź swoją skrzynkę email.";

    registerForm.reset();

});

}
