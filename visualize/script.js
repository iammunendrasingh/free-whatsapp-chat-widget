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

    let topHeight = document.getElementById('top').offsetHeight;
    let isResizing = false;

    document.getElementById('divider').addEventListener('mousedown', (e) => {
        isResizing = true;
        let startY = e.clientY;
        let startTopHeight = topHeight;

        const onMouseMove = (e) => {
            if (isResizing) {
                topHeight = startTopHeight + (e.clientY - startY);
                topHeight = Math.max(50, topHeight); // Minimum height
                topHeight = Math.min(window.innerHeight - 50, topHeight); // Maximum height
                document.getElementById('top').style.height = topHeight + 'px';
                document.getElementById('bottom').style.height = `calc(100vh - ${topHeight}px - 10px)`; // 10px for divider
            }
        };

        const onMouseUp = () => {
            isResizing = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    document.getElementById('fullscreen-btn').addEventListener('click', () => {
        const isFullScreen = document.body.classList.toggle('fullscreen');
        document.getElementById('fullscreen-btn').innerText = isFullScreen ? 'Reset View' : 'Full Screen';
        if (isFullScreen) {
            topHeight = 10;
            document.getElementById('top').style.height = topHeight + 'px';
            document.getElementById('bottom').style.height = '100vh';
        } else {
            topHeight = 200; // Default height
            document.getElementById('top').style.height = topHeight + 'px';
            document.getElementById('bottom').style.height = `calc(100vh - ${topHeight}px - 10px)`; // 10px for divider
        }
    });
});
