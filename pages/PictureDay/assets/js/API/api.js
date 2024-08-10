var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_KEY = 'AkrAPSTudQbZDrOqWI1RdTaWmAK6bnjcFycwe1eb';
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
export function fetchAstronomyPictureOfTheDay() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(APOD_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
            return data;
        }
        catch (error) {
            console.error("Ошибка при запросе к API NASA: ", error);
            return null;
        }
    });
}
function translateText(text, targetLang) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = 'https://api.openai.com/v1/chat/completions';
        const prompt = `Translate the following text to ${targetLang}:\n\n${text}`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
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
                max_tokens: 1000
            })
        };
        try {
            const response = yield fetch(url, options);
            const result = yield response.json();
            console.log('API Response:', result); // Выводим полный ответ в консоль
            if (result.error) {
                console.error('Ошибка API:', result.error.message);
                return `Ошибка перевода: ${result.error.message}`;
            }
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
