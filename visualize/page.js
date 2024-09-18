document.addEventListener("DOMContentLoaded", function () {
    // Set page-specific time variables in seconds (override global if needed)
    const PAGE_WIDGET_OPEN_DELAY = 5; // Page-specific delay before showing the widget
    const PAGE_TYPING_DURATION = 4; // Page-specific duration for the "Typing..." effect
    const MESSAGE_DISPLAY_DELAY = PAGE_TYPING_DURATION + 1; // Time to display the message after typing

    // Convert seconds to milliseconds
    const PAGE_WIDGET_OPEN_DELAY_MS = PAGE_WIDGET_OPEN_DELAY * 1000;
    const PAGE_TYPING_DURATION_MS = PAGE_TYPING_DURATION * 1000;
    const MESSAGE_DISPLAY_DELAY_MS = MESSAGE_DISPLAY_DELAY * 1000;

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

    // After a delay, show the chat widget and trigger the global event
    setTimeout(function () {
        const chatBox = document.querySelector('.wa-chat-box');
        if (chatBox) {
            chatBox.style.display = 'block'; // Show the chat widget
            document.dispatchEvent(new Event("widgetVisible")); // Trigger the event for global status changes
        }

        // Add personalized message after "chatReady" is triggered
        document.addEventListener("chatReady", function () {
            setTimeout(function () {
                const chatContainer = document.querySelector('.wa-chat-box-content');
                const originalMessage = document.querySelector('.wa-chat-box-content-chat');

                if (chatContainer && originalMessage) {
                    // Clone the original chat message div
                    const newMessageDiv = originalMessage.cloneNode(true);

                    // Remove the brand name div in the cloned message
                    const brandElement = newMessageDiv.querySelector('.wa-chat-box-content-chat-brand');
                    if (brandElement) {
                        brandElement.remove();
                    }

                    // Update the new message text inside the cloned div
                    const welcomeMessage = newMessageDiv.querySelector('.wa-chat-box-content-chat-welcome');
                    if (welcomeMessage) {
                        // Personalized message for this specific page
                        welcomeMessage.innerHTML = `Need assistance setting up your Widget?<br>I'm here to help—free of charge!`;
                    }

                    // Append the new message div to the chat container
                    chatContainer.appendChild(newMessageDiv);
                }
            }, MESSAGE_DISPLAY_DELAY_MS); // Delay to show message after typing ends
        });

        // Show typing effect before the message
        const subtitleElement = document.querySelector('.wa-chat-box-brand-subtitle');
        if (subtitleElement) {
            showTypingEffect(subtitleElement, PAGE_TYPING_DURATION_MS); // Show typing effect for page-specific duration

            // Change status to Online immediately after typing ends
            setTimeout(function () {
                subtitleElement.innerHTML = "Online";
            }, PAGE_TYPING_DURATION_MS);
        }
    }, PAGE_WIDGET_OPEN_DELAY_MS); // Use page-specific delay to open widget
});
