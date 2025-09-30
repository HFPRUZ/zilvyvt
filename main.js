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