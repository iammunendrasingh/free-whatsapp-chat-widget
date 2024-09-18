document.addEventListener("DOMContentLoaded", function () {
    // Define page-specific delay time in milliseconds
    const PAGE_DELAY_TIME = 3000; // Change this value to adjust the delay

    // After a delay, show the chat widget and trigger the global event
    setTimeout(function () {
        const chatBox = document.querySelector('.wa-chat-box');
        if (chatBox) {
            chatBox.style.display = 'block'; // Show the chat widget
            document.dispatchEvent(new Event("widgetVisible")); // Trigger the event for the global JS to start
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
            }, PAGE_DELAY_TIME); // Use PAGE_DELAY_TIME variable
        });
    }, PAGE_DELAY_TIME); // Use PAGE_DELAY_TIME variable
});
