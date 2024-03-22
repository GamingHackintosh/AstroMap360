document.addEventListener('DOMContentLoaded', async () => {
    console.log('AstroMap360 загружен и готов к работе!');
    const apodData = await fetchAstronomyPictureOfTheDay();
    if (apodData) {
        console.log('Изображение дня от NASA:', apodData);
        document.getElementById('apodImage').src = apodData.url;
        document.getElementById('apodTitle').textContent = apodData.title;
        document.getElementById('apodDescription').textContent = apodData.explanation;
    }
});
