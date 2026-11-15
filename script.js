// =============================================
// ISURI & ASHAN WEDDING INVITATION
// =============================================

// 1. LANGUAGE SWITCHING
const languageButtons = document.querySelectorAll(".lang-btn");
let currentLanguage = "en";

function setLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = language;
    document.body.classList.toggle("lang-si", language === "si");

    languageButtons.forEach(button => {
        const active = button.dataset.lang === language;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
    });

    document.querySelectorAll("[data-en][data-si]").forEach(element => {
        element.textContent = element.dataset[language];
    });
}

languageButtons.forEach(button => {
    button.addEventListener("click", () => {
        setLanguage(button.dataset.lang);
    });
});

// 2. AUTOMATIC BACKGROUND MUSIC
const backgroundAudio = document.getElementById("backgroundAudio");
if (backgroundAudio) {
    backgroundAudio.volume = 0.7;
    backgroundAudio.muted = false;
}

async function playWeddingMusic() {
    if (!backgroundAudio) return;
    try {
        await backgroundAudio.play();
        console.log("Wedding background music is playing.");
    } catch (error) {
        console.log("Browser blocked autoplay:", error);
    }
}

window.addEventListener("load", () => {
    playWeddingMusic();
});

function startMusicAfterInteraction() {
    if (backgroundAudio && backgroundAudio.paused) {
        playWeddingMusic();
    }
    document.removeEventListener("click", startMusicAfterInteraction);
    document.removeEventListener("touchstart", startMusicAfterInteraction);
    document.removeEventListener("keydown", startMusicAfterInteraction);
}

document.addEventListener("click", startMusicAfterInteraction);
document.addEventListener("touchstart", startMusicAfterInteraction);
document.addEventListener("keydown", startMusicAfterInteraction);

// 3. OPEN WEDDING INVITATION
const openInvitationBtn = document.getElementById("openInvitation");
if (openInvitationBtn) {
    openInvitationBtn.addEventListener("click", () => {
        const content = document.getElementById("invitationContent");
        if (content) {
            content.classList.add("visible");
            content.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
}

// 4. WEDDING COUNTDOWN
const weddingDate = new Date("2027-03-10T10:00:00+05:30").getTime();

function updateCountdown() {
    const remaining = Math.max(0, weddingDate - Date.now());
    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.textContent = String(days).padStart(3, "0");
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
}

setLanguage("en");
updateCountdown();
setInterval(updateCountdown, 1000);

// =============================================
// END OF WEDDING INVITATION JAVASCRIPT
// =============================================
