var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchAstronomyPictureOfTheDay } from 'api.js';
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
