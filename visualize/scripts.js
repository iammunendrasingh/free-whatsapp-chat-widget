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
});

let topHeight = 250;
let isResizing = false;
let originalTopHeight = topHeight;
let isFullScreen = false;

document.getElementById('divider').addEventListener('mousedown', (e) => {
    isResizing = true;
    let startY = e.clientY;
    let startTopHeight = topHeight;

    document.addEventListener('mousemove', (e) => {
        if (isResizing) {
            topHeight = startTopHeight + (e.clientY - startY);
            if (topHeight < 50) topHeight = 50; // Minimum height for the top section
            if (topHeight > window.innerHeight - 50) topHeight = window.innerHeight - 50; // Maximum height for the top section
            document.getElementById('top').style.height = topHeight + 'px';
            document.getElementById('bottom').style.height = 'calc(100vh - ' + topHeight + 'px - 10px)'; // Account for divider height
        }
    });

    document.addEventListener('mouseup', () => {
        isResizing = false;
    });
});

document.getElementById('fullscreen-btn').addEventListener('click', () => {
    if (!isFullScreen) {
        originalTopHeight = topHeight;
        topHeight = 0;
        document.getElementById('top').style.height = topHeight + 'px';
        document.getElementById('bottom').style.height = 'calc(100vh - 10px)'; // Account for divider height
        document.getElementById('fullscreen-btn').innerText = 'Reset View';
        isFullScreen = true;
    } else {
        topHeight = originalTopHeight;
        document.getElementById('top').style.height = topHeight + 'px';
        document.getElementById('bottom').style.height = 'calc(100vh - ' + topHeight + 'px - 10px)'; // Account for divider height
        document.getElementById('fullscreen-btn').innerText = 'Full Screen';
        isFullScreen = false;
    }
});
