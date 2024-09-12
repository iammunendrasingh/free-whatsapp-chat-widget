function loadWebsite() {
    const websiteURL = document.getElementById('website-url').value;
    const iframe = document.getElementById('website-frame');
    const errorMessage = document.getElementById('error-message');

    if (isValidURL(websiteURL)) {
        iframe.src = websiteURL;
        errorMessage.innerText = '';
    } else {
        errorMessage.innerText = 'Please enter a valid URL';
        errorMessage.style.display = 'block'; // Show the error message
    }
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('website-url').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            loadWebsite();
        }
    });

    document.getElementById('fullscreen-btn').addEventListener('click', () => {
        const isFullScreen = document.body.classList.toggle('fullscreen');
        document.getElementById('fullscreen-btn').innerText = isFullScreen ? '⬇ Reset View ⬇' : '↕️ Full Screen ↕️';
        document.getElementById('top').style.height = isFullScreen ? '0px' : 'auto'; // Adjust as needed
        document.getElementById('bottom').style.height = isFullScreen ? 'calc(100vh - 10px)' : 'calc(100vh - 200px - 10px)'; // 40px for button
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const promoBtn = document.getElementById('promo-btn');
    setTimeout(() => {
        promoBtn.style.transform = 'translateX(0)';
        promoBtn.style.opacity = '1';
    }, 3000);

    promoBtn.addEventListener('click', () => {
        window.open('https://iframeweb.com/tools/free-whatsapp-chat-widget-for-website/', '_blank');
    });
});