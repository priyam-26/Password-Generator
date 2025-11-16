const passwordEl = document.getElementById("password");
const lengthEl = document.getElementById("length");
const lengthVal = document.querySelector(".lengthVal");
const lowerEl = document.getElementById("lower");
const upperEl = document.getElementById("upper");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copyBtn");
const strengthText = document.getElementById("strengthText");
const bar = document.getElementById("bar");
const toast = document.getElementById("toast");


const chars= {
    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~-={}[]<>?/"
};


function generatePassword() {
    let pool = ""

    if (lowerEl.checked) {
        pool += chars.lower;
    }
    if (upperEl.checked) {
        pool += chars.upper;
    }
    if (numbersEl.checked) {
        pool += chars.numbers;
    }
    if (symbolsEl.checked) {
        pool += chars.symbols;
    }

    if(!pool) {
        passwordEl.textContent = "Select at least one option!"
        bar.style.width = "0%";
        strengthText.textContent = "Strength: --";
        return;
    }

    const length = +lengthEl.value;
    let password = ""
    for (let i = 0; i < length; i++) {
        password += pool.charAt(secureRandom(pool.length));
    }

    passwordEl.textContent = password;
    updateStrength(password);
}

function secureRandom(max) {
    const arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
}

function updateStrength(password) {
    let score = 0;
    if (password.length >= 8) score += 25;
    if (/[A-Z]/.test(password)) score += 25;
    if (/\d/.test(password)) score += 25;
    if (/[^A-Za-z0-9]/.test(password)) score += 25;

    if (score < 50) {
        strengthText.textContent = "Strength: Weak";
        bar.style.background = "linear-gradient(90deg, #ef4444, #f97316)"
        bar.style.width = "30%"
    }
    else if (score < 75) {
        strengthText.textContent = "Strength: Medium";
        bar.style.background = "linear-gradient(90deg, #f59e0b, #facc15)"
        bar.style.width = "60%"
    }
    else {
        strengthText.textContent = "Strength: Strong";
        bar.style.background = "linear-gradient(90deg, #44ef4aff, #007204ff)"
        bar.style.width = "100%"
    }
}

function copyPassword() {
    const text = passwordEl.textContent;
    if (
        !text ||
        text === "Generated Password!" ||
        text === "Select at least one option!"
    ) {
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        toast.classList.add("show");

        setTimeout(() => toast.classList.remove("show"), 1500);
    });
}

lengthEl.addEventListener("input", () => {
    lengthVal.textContent = lengthEl.value;
});

generateBtn.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", copyPassword);

window.addEventListener("load", generatePassword);