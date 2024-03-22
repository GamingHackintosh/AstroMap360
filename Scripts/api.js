"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAstronomyPictureOfTheDay = void 0;
const API_KEY = 'AkrAPSTudQbZDrOqWI1RdTaWmAK6bnjcFycwe1eb';
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
// TypeScript: функция для запроса к API с уточнённым возвращаемым типом
function fetchAstronomyPictureOfTheDay() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(APOD_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Ошибка при запросе к API NASA: ", error);
            return null;
        }
    });
}
exports.fetchAstronomyPictureOfTheDay = fetchAstronomyPictureOfTheDay;
