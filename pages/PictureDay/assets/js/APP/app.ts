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

const apiKey = 'sk--oDNblqHENeA_v6DqMx824iS5GJATvV4FK6HB1yVmZT3BlbkFJlTmGy2x69EuEENdmW7h5jGZPUu-mcCnrJPRw486rAA'; // Замените на ваш реальный ключ API

async function translateText(text: string, targetLang: string): Promise<string> {
    const url = 'https://api.openai.com/v1/chat/completions';
    const prompt = `Translate the following text to ${targetLang}:\n\n${text}`;

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo', // Или используйте другую модель GPT, например, gpt-4
            messages: [
                {
                    role: 'system',
                    content: 'You are a helpful assistant that translates text.'
                },
                {
                    role: 'user',
                    content: prompt
                }
            ],
            max_tokens: 1000 // Максимальное количество токенов в ответе
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log('API Response:', result); // Выводим полный ответ в консоль
        
        if (result && result.choices && result.choices.length > 0) {
            return result.choices[0].message.content.trim();
        } else {
            console.error('Неверный формат ответа:', result);
            return 'Ошибка перевода';
        }
    } catch (error) {
        console.error('Ошибка перевода:', error);
        return 'Ошибка перевода';
    }
}

document.getElementById('apod-translateButton')?.addEventListener('click', async () => {
    const descriptionElement = document.getElementById('apodDescription') as HTMLParagraphElement | null;
    if (descriptionElement) {
        const translatedText = await translateText(descriptionElement.textContent || '', 'ru');
        descriptionElement.textContent = translatedText;
    }
});
