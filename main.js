sessionStorage.removeItem('isAgeVerified');
document.addEventListener('DOMContentLoaded', () => {
    const ageConfirmed = sessionStorage.getItem('isAgeVerified');
    
    if (!ageConfirmed) {
        document.getElementById('age-gate-modal').style.display = 'flex';
    } else {
        loadContent(ageConfirmed === 'true');
    }
});

const IMAGE_PATHS = {
    REGULAR: 'images/imagen-vtuber.jpg',
    ADULT: 'images/imagen-vtuber-adult.jpg'
};

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
        profileImage.src = IMAGE_PATHS.ADULT;
        restrictedLink.style.display = 'block';
    } else {
        profileImage.src = IMAGE_PATHS.REGULAR;
        restrictedLink.style.display = 'none';
    }
}
