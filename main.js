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

let leftIndex = 0;
let rightIndex = 1;
let mobileIndex = 0;

// Verificación de edad
document.addEventListener('DOMContentLoaded', () => {
    const ageConfirmed = sessionStorage.getItem('isAgeVerified');
    if (!ageConfirmed) {
        document.getElementById('age-gate-modal').style.display = 'flex';
    } else {
        loadContent(ageConfirmed === 'true');
    }
    changeGifs();
    setInterval(changeGifs, 20000);
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
    if (showAdultContent) {
        profileImage.src = 'images/imagen-vtuber-adult.jpg';
        restrictedLink.style.display = 'block';
    } else {
        profileImage.src = 'images/imagen-vtuber.jpg';
        restrictedLink.style.display = 'none';
    }
}

// Cambiar GIFs
function changeGifs() {
    if (window.innerWidth > 768) {
        // PC
        document.getElementById("left-gif").src = gifs[leftIndex];
        document.getElementById("right-gif").src = gifs[rightIndex];
        leftIndex = (leftIndex + 2) % gifs.length;
        rightIndex = (rightIndex + 2) % gifs.length;
    } else {
        // Móvil
        document.body.style.backgroundImage = `url("${gifs[mobileIndex]}")`;
        mobileIndex = (mobileIndex + 1) % gifs.length;
    }
}
