import { fetchAstronomyPictureOfTheDay } from 'api.js';
document.addEventListener('DOMContentLoaded', async () => {
    console.log('AstroMap360 загружен и готов к работе!');
    const apodData = await fetchAstronomyPictureOfTheDay();
    const apodImage = document.getElementById('apodImage');
    const apodTitle = document.getElementById('apodTitle');
    const apodDescription = document.getElementById('apodDescription');
    if (apodData && apodImage && apodTitle && apodDescription) {
        console.log('Изображение дня от NASA:', apodData);
        apodImage.src = apodData.url;
        apodTitle.textContent = apodData.title;
        apodDescription.textContent = apodData.explanation;
    }
});
