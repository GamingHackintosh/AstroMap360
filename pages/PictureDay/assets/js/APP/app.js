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
/*=== Translate ===*/
function translateText(text, targetLang) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch("https://libretranslate.com/translate", {
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
        const data = yield res.json();
        return data.translatedText;
    });
}
(_a = document.getElementById('apod-translateButton')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const descriptionElement = document.getElementById('apodDescription');
    if (descriptionElement) {
        const translatedText = yield translateText(descriptionElement.textContent || '', 'ru');
        descriptionElement.textContent = translatedText;
    }
}));
