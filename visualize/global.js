document.addEventListener("DOMContentLoaded", function () {
    // Define delay time in milliseconds
    const DELAY_TIME = 3000; // Change this value to adjust the delay

    // Function to show typing effect with dots animation
    function showTypingEffect(element, duration) {
        let dots = 0;
        const typingInterval = setInterval(function () {
            dots = (dots + 1) % 4; // Cycles between 0, 1, 2, 3 dots
            element.innerHTML = `Typing${'.'.repeat(dots)}`;
        }, 500); // Change dots every 500ms

        // Stop after the specified duration
        setTimeout(function () {
            clearInterval(typingInterval);
            document.dispatchEvent(new Event("chatReady")); // Custom event to signal typing is done
        }, duration);
    }

    // Function to get the current local time in HH:MM AM/PM format
    function getCurrentLocalTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const period = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = (hours % 12) || 12; // Convert to 12-hour format
        return `${formattedHours}:${minutes} ${period}`;
    }

    // Function to get a random duration between 30 and 60 seconds
    function getRandomDuration() {
        return Math.floor(Math.random() * (60 - 30 + 1) + 30) * 1000; // Convert seconds to milliseconds
    }

    // Function to handle the online and last seen status changes
    function toggleOnlineStatus(subtitleElement) {
        const currentTime = getCurrentLocalTime();
        const statusDot = document.querySelector('.online-status'); // Assuming this is the dot for online status

        function setStatusToOnline() {
            if (subtitleElement) {
                subtitleElement.innerHTML = "Online";
            }
            if (statusDot) {
                statusDot.style.background = 'var(--OnlineStatus)'; // Set dot to green (online color)
            }

            setTimeout(setStatusToLastSeen, getRandomDuration());
        }

        function setStatusToLastSeen() {
            if (subtitleElement) {
                subtitleElement.innerHTML = `Last seen today at ${currentTime}`;
            }
            if (statusDot) {
                statusDot.style.background = 'var(--OfflineStatus)'; // Set dot to offline color
            }

            // Randomly choose a duration (30 to 60 seconds) to switch back to "Online"
            setTimeout(setStatusToOnline, getRandomDuration());
        }

        // Start with "Online" status
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

    // Listen for the custom event to start status changes and make the chat visible
    document.addEventListener("widgetVisible", function () {
        // Show "Typing..." effect for the defined duration
        const subtitleElement = document.querySelector('.wa-chat-box-brand-subtitle');
        if (subtitleElement) {
            showTypingEffect(subtitleElement, DELAY_TIME); // Use DELAY_TIME variable
        }

        // After typing effect, handle visibility and online status
        document.addEventListener("chatReady", function () {
            if (chatBoxContent) {
                chatBoxContent.style.visibility = 'visible'; // Make chat box content visible after typing
            }

            if (subtitleElement) {
                toggleOnlineStatus(subtitleElement); // Start toggling between Online and Last Seen
            }
        });
    });

    // Detect chat box display changes (e.g., from user interaction)
    detectChatBoxDisplayChange();
});
