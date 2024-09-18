document.addEventListener("DOMContentLoaded", function () {
    // Set default time variables in seconds
    const MIN_RANDOM_DURATION = 30; // Min duration for status toggle
    const MAX_RANDOM_DURATION = 60; // Max duration for status toggle

    // Function to get the current local time in HH:MM AM/PM format
    function getCurrentLocalTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12; // Convert to 12-hour format
        return `${formattedHours}:${minutes} ${period}`;
    }

    // Function to get a random duration between the defined min and max values
    function getRandomDuration(minSeconds, maxSeconds) {
        return Math.floor(Math.random() * (maxSeconds - minSeconds + 1) + minSeconds) * 1000; // Convert to milliseconds
    }

    // Function to handle the online and last seen status changes
    function toggleOnlineStatus(subtitleElement) {
        const statusDot = document.querySelector('.online-status'); // Dot for online status

        function setStatusToOnline() {
            if (subtitleElement) {
                subtitleElement.innerHTML = "Online";
            }
            if (statusDot) {
                statusDot.style.background = 'var(--OnlineStatus)'; // Green dot for online
            }

            setTimeout(setStatusToLastSeen, getRandomDuration(MIN_RANDOM_DURATION, MAX_RANDOM_DURATION));
        }

        function setStatusToLastSeen() {
            const currentTime = getCurrentLocalTime(); // Get the current time
            if (subtitleElement) {
                subtitleElement.innerHTML = `Last seen today at ${currentTime}`;
            }
            if (statusDot) {
                statusDot.style.background = 'var(--OfflineStatus)'; // Gray dot for offline
            }

            // Switch back to "Online" after a random time
            setTimeout(setStatusToOnline, getRandomDuration(MIN_RANDOM_DURATION, MAX_RANDOM_DURATION));
        }

        // Start with "Online" status after typing finishes
        setStatusToOnline();
    }

    // Initially hide the chat box and its content
    const chatBox = document.querySelector('.wa-chat-box');
    const chatBoxContent = document.querySelector('.wa-chat-box-content-chat');
    if (chatBox) {
        chatBox.style.display = 'none'; // Ensure chat box is hidden initially
    }
    if (chatBoxContent) {
        chatBoxContent.style.visibility = 'hidden'; // Hide chat content initially
    }

    // Function to detect when the chatBox display is changed to block
    function detectChatBoxDisplayChange() {
        if (!chatBox) return; // Exit if chatBox is not found

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === "style") {
                    const displayStyle = window.getComputedStyle(chatBox).display;
                    if (displayStyle === "block") {
                        // When display changes to block, start the status updates
                        document.dispatchEvent(new Event("widgetVisible")); // Trigger event for status updates
                    }
                }
            });
        });

        observer.observe(chatBox, { attributes: true });
    }

    // Listen for the custom event to start status changes and visibility
    document.addEventListener("widgetVisible", function () {
        const subtitleElement = document.querySelector('.wa-chat-box-brand-subtitle');
        if (chatBoxContent) {
            chatBoxContent.style.visibility = 'visible'; // Make chat content visible
        }

        // Start toggling statuses after typing effect
        if (subtitleElement) {
            toggleOnlineStatus(subtitleElement);
        }
    });

    // Detect chat box display changes (e.g., from user interaction)
    detectChatBoxDisplayChange();
});
