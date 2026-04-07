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
    let pool = "";
    let requiredChars = [];

    if (lowerEl.checked) {
        pool += chars.lower;
        requiredChars.push(randomChar(chars.lower));
    }
    if (upperEl.checked) {
        pool += chars.upper;
        requiredChars.push(randomChar(chars.upper));
    }
    if (numbersEl.checked) {
        pool += chars.numbers;
        requiredChars.push(randomChar(chars.numbers));
    }
    if (symbolsEl.checked) {
        pool += chars.symbols;
        requiredChars.push(randomChar(chars.symbols));
    }

    if (!pool) {
        passwordEl.textContent = "Select at least one option!";
        bar.style.width = "0%";
        strengthText.textContent = "Strength: --";
        return;
    }

    const length = +lengthEl.value;
    let password = [...requiredChars];

    for (let i = password.length; i < length; i++) {
        password.push(pool.charAt(secureRandom(pool.length)));
    }

    // Shuffle password
    password = shuffle(password).join("");

    passwordEl.textContent = password;
    updateStrength(password);
}

function randomChar(str) {
    return str.charAt(secureRandom(str.length));
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = secureRandom(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function secureRandom(max) {
    const array = new Uint32Array(1);
    let random;

    do {
        window.crypto.getRandomValues(array);
        random = array[0];
    } while (random >= Math.floor(4294967296 / max) * max);

    return random % max;
}

function updateStrength(password) {
    let score = 0;

    if (password.length >= 12) score += 25;
    if (password.length >= 16) score += 10;

    if (/[a-z]/.test(password)) score += 15;
    if (/[A-Z]/.test(password)) score += 15;
    if (/\d/.test(password)) score += 15;
    if (/[^A-Za-z0-9]/.test(password)) score += 20;

    if (score < 50) {
        strengthText.textContent = "Strength: Weak";
        bar.style.background = "linear-gradient(90deg, #ef4444, #f97316)";
        bar.style.width = "30%";
    } else if (score < 80) {
        strengthText.textContent = "Strength: Medium";
        bar.style.background = "linear-gradient(90deg, #f59e0b, #facc15)";
        bar.style.width = "60%";
    } else {
        strengthText.textContent = "Strength: Strong";
        bar.style.background = "linear-gradient(90deg, #22c55e, #16a34a)";
        bar.style.width = "100%";
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