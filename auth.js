const SUPABASE_URL = "https://bldqxuhkcnmxouwgvner.supabase.co/rest/v1/";
const SUPABASE_KEY = "sb_publishable_ukt5DGR_NxRdTFuVXRWahg_rA5qaONg";

const supabaseClient = window.supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const logoutButton = document.getElementById("logoutButton");

const registerMessage = document.getElementById("registerMessage");
const loginMessage = document.getElementById("loginMessage");

if (registerForm) {
registerForm.addEventListener("submit", async (event) => {
event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword =
        document.getElementById("confirmPassword").value;

    registerMessage.textContent = "";

    if (password !== confirmPassword) {
        registerMessage.textContent = "Hasła nie są takie same.";
        return;
    }

    if (password.length < 6) {
        registerMessage.textContent =
            "Hasło musi mieć minimum 6 znaków.";
        return;
    }

    registerMessage.textContent = "Tworzenie konta...";

    const { error } = await supabaseClient.auth.signUp({
        email,
        password
    });

    if (error) {
        registerMessage.textContent = error.message;
        return;
    }

    registerMessage.textContent =
        "Konto utworzone. Sprawdź email, jeśli wymagane jest potwierdzenie.";

    registerForm.reset();
});

}

if (loginForm) {
loginForm.addEventListener("submit", async (event) => {
event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginMessage.textContent = "Logowanie...";

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        loginMessage.textContent = error.message;
        return;
    }

    window.location.href = "dashboard.html";
});

}

if (logoutButton) {
logoutButton.addEventListener("click", async () => {
await supabaseClient.auth.signOut();
window.location.href = "index.html";
});
}

async function checkUser() {
const { data } = await supabaseClient.auth.getUser();

if (!data.user) {
    window.location.href = "login.html";
    return;
}

const userEmail = document.getElementById("userEmail");

if (userEmail) {
    userEmail.textContent = data.user.email;
}

}

if (document.body.dataset.page === "dashboard") {
checkUser();
}