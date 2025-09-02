document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('time-slider');
    const modernPhoto = document.getElementById('modern-photo'); // Get the top image
    const viewer = document.getElementById('time-travel-viewer');

    const handleSliderInput = () => {
        const value = slider.value;

        // 1. Control opacity of the top image for crossfade
        // slider value 100 -> opacity 1. slider value 0 -> opacity 0.
        modernPhoto.style.opacity = value / 100;

        // 2. Toggle caption visibility (same logic as before)
        viewer.classList.toggle('caption-is-visible', value <= 70);
    };

    // Initialize the component state on load
    handleSliderInput();

    // Add the event listener
    slider.addEventListener('input', handleSliderInput);
});