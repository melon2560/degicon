document.addEventListener('DOMContentLoaded', () => {
    // --- DATA --- //
    const locations = {
        niigataFestival: {
            title: '新潟祭り',
            images: [
                'assets/Festival/Niigata-Matsuri_20130809-05.jpg' ,// Oldest
                'assets/Festival/Generated Image September 02, 2025 - 10_06AM.jpg'// Newest
            ],
            labels: ['現代', '過去'], // Newest, Oldest
            trivia: {
                title: '新潟祭り (にいがたまつり)',
                text: '毎年8月上旬に開催される新潟市最大の祭り。大民謡流し、住吉行列、花火大会など、様々なイベントが行われ、街全体が活気に満ち溢れます。'
            }
        },
        fireworks: {
            title: '花火',
            images: [
                'assets/Fireworks/Everlasting_Fireworks_looped.gif', // Newest
                'assets/Fireworks/Famous_Places_of_Edo_(Fireworks_at_Ryogoku),_by_Utagawa_Hiroshige,_Japan,_Edo_period,_1800s_AD,_woodblock_print_on_paper_-_Tokyo_National_Museum_-_Tokyo,_Japan_-_DSC09279.jpg' // Oldest
            ],
            labels: ['現代', '過去'], // Newest, Oldest
            trivia: {
                title: '花火 (はなび)',
                text: '日本の夏の風物詩である花火。古くは江戸時代から庶民に親しまれ、浮世絵にも描かれてきました。現代では、技術の進化により、より大規模で芸術的な花火大会が各地で開催されています。'
            }
        }
    };

    // --- DOM ELEMENTS --- //
    const selectionScreen = document.getElementById('selection-screen');
    const sliderView = document.getElementById('slider-view');
    const locationCards = document.querySelectorAll('.location-card');
    const backButton = document.getElementById('back-button');

    const locationTitle = document.getElementById('location-title');
    const timeSlider = document.getElementById('time-slider');
    const bottomImage = document.getElementById('bottom-image');
    const topImage = document.getElementById('top-image');
    const timeTravelViewer = document.getElementById('time-travel-viewer');

    const triviaTitle = document.getElementById('trivia-title');
    const triviaText = document.getElementById('trivia-text');
    const sliderLabelStart = document.getElementById('slider-label-start');
    const sliderLabelEnd = document.getElementById('slider-label-end');

    let currentImages = [];

    // --- FUNCTIONS --- //

    function initializeSlider(locationData) {
        currentImages = locationData.images;
        const imageCount = currentImages.length;

        locationTitle.textContent = locationData.title;
        triviaTitle.textContent = locationData.trivia.title;
        triviaText.textContent = locationData.trivia.text;

        timeSlider.max = imageCount - 1;
        timeSlider.value = imageCount - 1; // Start at the oldest image (rightmost)
        timeSlider.step = 0.01; // Use a small step for smooth transition

        sliderLabelStart.textContent = locationData.labels[0];
        sliderLabelEnd.textContent = locationData.labels[locationData.labels.length - 1];

        updateSliderView();
    }

    function updateSliderView() {
        const sliderValue = parseFloat(timeSlider.value);
        
        const indexFloor = Math.floor(sliderValue);
        const indexCeil = Math.ceil(sliderValue);
        const progress = sliderValue - indexFloor;

        // Set the src for the two images being crossfaded
        if (bottomImage.src !== currentImages[indexFloor]) {
             bottomImage.src = currentImages[indexFloor];
        }
        if (topImage.src !== currentImages[indexCeil]) {
            topImage.src = currentImages[indexCeil];
        }

        // Set opacity for the top image
        bottomImage.style.opacity = 1;
        topImage.style.opacity = progress;

        // Toggle trivia card visibility
        const isCaptionVisible = sliderValue < (currentImages.length - 1) * 0.8;
        timeTravelViewer.classList.toggle('caption-is-visible', isCaptionVisible);
    }

    function switchView(viewName) {
        if (viewName === 'slider') {
            selectionScreen.classList.add('hidden');
            sliderView.classList.remove('hidden');
        } else {
            sliderView.classList.add('hidden');
            selectionScreen.classList.remove('hidden');
        }
    }

    // --- EVENT LISTENERS --- //

    locationCards.forEach(card => {
        card.addEventListener('click', () => {
            const locationKey = card.dataset.location;
            const data = locations[locationKey];
            if (data) {
                initializeSlider(data);
                switchView('slider');
            }
        });
    });

    backButton.addEventListener('click', () => {
        switchView('selection');
    });

    timeSlider.addEventListener('input', updateSliderView);

});
