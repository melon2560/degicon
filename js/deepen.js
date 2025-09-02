document.addEventListener('DOMContentLoaded', () => {
    // --- DATA --- //
    const locations = {
        bandai: {
            title: '萬代橋',
            images: [
                'assets/Bandai Bridge/Bandai_bridge_1st_around_1900.png',
                'assets/Bandai Bridge/Bandaibashi-Bridge_20130929.jpg'
            ],
            labels: ['初代', '現代'],
            trivia: {
                title: '萬代橋 (ばんだいばし)',
                text: '新潟市の中心部を流れる信濃川に架かる、街のシンボル。現在の橋は1929年に完成した三代目で、美しい連続するアーチが特徴。国の重要文化財にも指定されています。'
            }
        },
        niigata: {
            title: '新潟駅',
            images: [
                'assets/Niigata Station/Niigata_Station_in_Taisho_era.jpg',
                'assets/Niigata Station/Niigata_Station_in_the_Pre-war_Showa_era.jpg',
                'assets/Niigata Station/JR_Niigata_Station_South_Exit.jpg'
            ],
            labels: ['大正', '昭和', '現代'],
            trivia: {
                title: '新潟駅 (にいがたえき)',
                text: '新潟県の県庁所在地、新潟市の中央駅。初代の駅舎は1897年に開業。現在の駅舎は、高架化工事などを経て進化を続けており、新潟の陸の玄関口として多くの人に利用されています。'
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
        timeSlider.value = imageCount - 1;
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