document.addEventListener('DOMContentLoaded', () => {
    const timeSlider = document.getElementById('time-slider');
    const mainPhoto = document.getElementById('main-photo');
    const timeViewer = document.getElementById('time-travel-viewer');

    const handleSliderInput = () => {
        const value = timeSlider.value;

        // 1. 画像のフィルターを更新
        if (value > 80) {
            mainPhoto.style.filter = 'none';
        } else if (value > 30) {
            mainPhoto.style.filter = 'sepia(1)';
        } else {
            mainPhoto.style.filter = 'grayscale(1) contrast(1.1) brightness(0.95)';
        }

        // 2. 親要素にクラスを付け外しして、CSSアニメーションを起動
        const isCaptionVisible = value <= 70;
        timeViewer.classList.toggle('caption-is-visible', isCaptionVisible);
    };

    timeSlider.addEventListener('input', handleSliderInput);
    handleSliderInput(); // 初期表示
});