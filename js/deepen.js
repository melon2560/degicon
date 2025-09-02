document.addEventListener('DOMContentLoaded', () => {
    // 操作するHTML要素を取得
    const timeSlider = document.getElementById('time-slider');
    const mainPhoto = document.getElementById('main-photo');
    const triviaCard = document.getElementById('trivia-card');

    // スライダーが動かされた時に実行する処理
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

        // 2. 豆知識カードの表示/非表示を切り替え (アニメーション付き)
        const isCaptionVisible = value <= 70;
        triviaCard.classList.toggle('opacity-0', !isCaptionVisible);
        triviaCard.classList.toggle('scale-95', !isCaptionVisible);
    };

    // スライダーにイベントリスナーを設定
    timeSlider.addEventListener('input', handleSliderInput);

    // 初期表示時にも一度実行
    handleSliderInput();
});