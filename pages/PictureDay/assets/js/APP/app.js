var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { fetchAstronomyPictureOfTheDay } from '../API/api.js';
document.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('AstroMap360 загружен и готов к работе!');
    const apodData = yield fetchAstronomyPictureOfTheDay();
    const apodImage = document.getElementById('apodImage');
    const apodTitle = document.getElementById('apodTitle');
    const apodDescription = document.getElementById('apodDescription');
    if (apodData && apodImage && apodTitle && apodDescription) {
        console.log('Изображение дня от NASA:', apodData);
        apodImage.src = apodData.url;
        apodTitle.textContent = apodData.title;
        apodDescription.textContent = apodData.explanation;
    }
}));
const apiKey = 'sk-1CfPJEF48ZeXX0ZYJXNoJa3MIkV7skcKUI1NtR5pTgT3BlbkFJvfO8Ol14h_7-yT0SjNHCCzNzm-jhMlwqPiDFkTV7kA';
function translateText(text, targetLang) {
    return __awaiter(this, void 0, void 0, function* () {
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
            const response = yield fetch(url, options);
            const result = yield response.json();
            console.log('API Response:', result);
            if (result && result.choices && result.choices.length > 0) {
                return result.choices[0].message.content.trim();
            }
            else {
                console.error('Неверный формат ответа:', result);
                return 'Ошибка перевода';
            }
        }
        catch (error) {
            console.error('Ошибка перевода:', error);
            return 'Ошибка перевода';
        }
    });
}
(_a = document.getElementById('apod-translateButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const descriptionElement = document.getElementById('apodDescription');
    if (descriptionElement) {
        const translatedText = yield translateText(descriptionElement.textContent || '', 'ru');
        descriptionElement.textContent = translatedText;
    }
}));
