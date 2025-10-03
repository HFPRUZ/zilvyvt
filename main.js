// Limpiar sesión de prueba
sessionStorage.removeItem('isAgeVerified');

// GIFs disponibles
const gifs = [
    "images/zilvyvtdance.gif",
    "images/zilvyvtfall.gif",
    "images/zilvyvtflat.gif",
    "images/zilvyvtstamped.gif",
    "images/zilvyvtthoughtful.gif",
    "images/zilvyvtwiggle.gif",
    "images/zilvywalk.gif"
];

let gifIndex = 0;

// Verificación de edad
document.addEventListener('DOMContentLoaded', () => {
    const ageConfirmed = sessionStorage.getItem('isAgeVerified');
    if (!ageConfirmed) {
        document.getElementById('age-gate-modal').style.display = 'flex';
    } else {
        loadContent(ageConfirmed === 'true');
    }
    changeGifs();
    setInterval(changeGifs, 10000);
});

function verifyAge(isVerified) {
    document.getElementById('age-gate-modal').style.display = 'none';
    sessionStorage.setItem('isAgeVerified', isVerified);
    loadContent(isVerified);
}

function loadContent(showAdultContent) {
    document.getElementById('main-content').style.display = 'block';
    const profileImage = document.getElementById('profile-pic');
    const restrictedLink = document.getElementById('restricted-link');
    profileImage.src = showAdultContent ? 'images/imagen-vtuber-adult.jpg' : 'images/imagen-vtuber.jpg';
    restrictedLink.style.display = showAdultContent ? 'block' : 'none';
}

function changeGifs() {
    const linksContainer = document.querySelector('.links');
    linksContainer.style.backgroundImage = `url("${gifs[gifIndex]}")`;
    linksContainer.style.backgroundSize = 'cover';
    linksContainer.style.backgroundPosition = 'center';
    linksContainer.style.transition = 'background-image 0.5s ease-in-out';
    gifIndex = (gifIndex + 1) % gifs.length;
}

document.addEventListener("DOMContentLoaded", () => {
  // Botón para compartir la página completa
  const sharePageBtn = document.getElementById("share-page-btn");
  if (sharePageBtn) {
    sharePageBtn.addEventListener("click", async () => {
      const shareData = {
        title: "Mis enlaces",
        text: "Mira mis enlaces aquí ✨",
        url: window.location.href
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(window.location.href);
        alert("🔗 Enlace de la página copiado");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Compartir enlaces individuales
  document.querySelectorAll(".share-link-btn").forEach(btn => {
    btn.addEventListener("click", async () => {
      const url = btn.getAttribute("data-url");
      const shareData = {
        title: "Mira este enlace",
        url: url
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        navigator.clipboard.writeText(url);
        alert("🔗 Enlace copiado: " + url);
      }
    });
  });
});

/* === Código añadido: generación y comportamiento del QR en PC === */
(function setupSimpleQR(){
const qrContainer = document.getElementById('qr-container');
const qrImg = document.getElementById('qr-img');
if (!qrContainer || !qrImg) return;

function showQR() {
const url = window.location.href;
qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(url);
qrContainer.style.display = 'block';
qrContainer.setAttribute('aria-hidden', 'false');
}

function hideQR() {
qrContainer.style.display = 'none';
qrContainer.setAttribute('aria-hidden', 'true');
}

function checkScreen() {
if (window.innerWidth > 768) {
showQR();
} else {
hideQR();
}
}

// inicial + on resize
checkScreen();
window.addEventListener('resize', checkScreen);

// abrir link en desktop al hacer click
qrImg.addEventListener('click', () => {
window.open(window.location.href, '_blank');
});
})();