var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const part1 = 'AkrAPSTudQbZDrOq';
const part2 = 'WI1RdTaWmAK6bnjcFyc';
const part3 = 'we1eb';
const API_KEY = part1 + part2 + part3;
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
