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

// === Verificación de edad ===
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

// === Modal de compartir ===
const shareModal = document.getElementById("share-modal");
const shareCloseBtn = document.querySelector(".share-close-btn");
const nativeShareBtn = document.querySelector(".share-option.native-share");
const copyLinkBtn = document.querySelector(".share-option.copy-link");
const shareUrlText = document.getElementById("share-url-text");
const shareTitle = document.getElementById("share-title");
const sharePreview = document.getElementById("share-preview");

let currentShareUrl = "";
let isSharingPage = false;

// === Abrir modal desde botón global ===
const sharePageBtn = document.getElementById("share-page-btn");
if (sharePageBtn) {
  sharePageBtn.addEventListener("click", () => {
    currentShareUrl = window.location.href;
    isSharingPage = true;
    shareTitle.textContent = "ZilvyVT - Página Principal";
    shareUrlText.textContent = window.location.hostname;
    shareModal.classList.add("active");

    requestAnimationFrame(updateCarouselButtons);
  });
}

// === Abrir modal desde los tres puntos de los enlaces ===
document.querySelectorAll(".share-link-btn").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const parentLink = btn.closest("a");
    currentShareUrl = parentLink.getAttribute("data-url");
    isSharingPage = false;
    shareTitle.textContent = parentLink.querySelector(".link-button-text").textContent;
    shareUrlText.textContent = currentShareUrl;
    shareModal.classList.add("active");

    requestAnimationFrame(updateCarouselButtons);
  });
});

// === Cerrar modal ===
shareCloseBtn.addEventListener("click", () => shareModal.classList.remove("active"));
shareModal.addEventListener("click", e => {
  if (e.target === shareModal) shareModal.classList.remove("active");
});

// === Acción al hacer clic en la tarjeta grande ===
sharePreview.addEventListener("click", () => {
  if (isSharingPage) {
    navigator.clipboard.writeText(currentShareUrl);
    alert("🔗 Enlace copiado: " + currentShareUrl);
  } else {
    window.open(currentShareUrl, "_blank");
  }
});

// === Compartir nativo ===
nativeShareBtn.addEventListener("click", async () => {
  const shareData = { title: "Comparte este enlace", url: currentShareUrl };
  if (navigator.share) await navigator.share(shareData);
  else {
    navigator.clipboard.writeText(currentShareUrl);
    alert("🔗 Enlace copiado: " + currentShareUrl);
  }
});

// === Copiar enlace ===
copyLinkBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(currentShareUrl);
  alert("🔗 Enlace copiado: " + currentShareUrl);
});

// === Compartir en redes sociales ===
document.querySelectorAll(".platform-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const platform = btn.getAttribute("data-platform");
    const encodedUrl = encodeURIComponent(currentShareUrl);
    const text = encodeURIComponent("Mira este enlace de ZilvyVT ✨");

    const urls = {
      x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      whatsapp: `https://api.whatsapp.com/send?text=${text}%20${encodedUrl}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${text}`,
      messenger: `https://www.facebook.com/dialog/send?link=${encodedUrl}`,
      snapchat: `https://www.snapchat.com/scan?attachmentUrl=${encodedUrl}`,
      email: `mailto:?subject=${text}&body=${encodedUrl}`
    };

    window.open(urls[platform], "_blank");
  });
});

// === QR (solo PC) ===
(function setupSimpleQR() {
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
    if (window.innerWidth > 768) showQR();
    else hideQR();
  }

  checkScreen();
  window.addEventListener('resize', checkScreen);

  qrImg.addEventListener('click', () => {
    window.open(window.location.href, '_blank');
  });
})();

// Carousel dinámico
const carousel = document.querySelector('.share-platforms');
const btnLeft = document.querySelector('.carousel-btn-left');
const btnRight = document.querySelector('.carousel-btn-right');

function updateCarouselButtons() {
  if (!carousel) return;
  const maxScroll = carousel.scrollWidth - carousel.clientWidth;

  btnLeft.style.display = carousel.scrollLeft > 0 ? 'flex' : 'none';
  btnRight.style.display = carousel.scrollLeft < maxScroll - 1 ? 'flex' : 'none';
}

// Scroll al hacer click
btnLeft.addEventListener('click', () => {
  carousel.scrollBy({ left: -100, behavior: 'smooth' });
});
btnRight.addEventListener('click', () => {
  carousel.scrollBy({ left: 100, behavior: 'smooth' });
});

// Actualizar botones al hacer scroll o redimensionar
carousel.addEventListener('scroll', updateCarouselButtons);
window.addEventListener('resize', updateCarouselButtons);

// Inicializar
updateCarouselButtons();

