import { fetchAstronomyPictureOfTheDay } from '../API/api.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('AstroMap360 загружен и готов к работе!');
    const apodData = await fetchAstronomyPictureOfTheDay();
    const apodImage = document.getElementById('apodImage') as HTMLImageElement | null;
    const apodTitle = document.getElementById('apodTitle');
    const apodDescription = document.getElementById('apodDescription');

    if (apodData && apodImage && apodTitle && apodDescription) {
        console.log('Изображение дня от NASA:', apodData);
        apodImage.src = apodData.url;
        apodTitle.textContent = apodData.title;
        apodDescription.textContent = apodData.explanation;
    }
});

/*=== Translate ===*/
async function translateText(text: string, targetLang: string): Promise<string> {
    const res = await fetch("https://libretranslate.com/translate", {
        method: "POST",
        body: JSON.stringify({
            q: text,
            source: "auto",
            target: targetLang,
            format: "text",
            alternatives: 3,
            api_key: ""
        }),
        headers: { "Content-Type": "application/json" }
    });

    const data = await res.json();
    return data.translatedText;
}

document.getElementById('apod-translateButton')?.addEventListener('click', async () => {
    const descriptionElement = document.getElementById('apodDescription') as HTMLParagraphElement | null;
    if (descriptionElement) {
        const translatedText = await translateText(descriptionElement.textContent || '', 'ru');
        descriptionElement.textContent = translatedText;
    }
});
