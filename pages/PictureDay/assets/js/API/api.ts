// TypeScript: Определение интерфейса для ответа API NASA
export interface ApodResponse {
    url: string;
    title: string;
    explanation: string;
}

const part1 = 'AkrAPSTudQbZDrOq';
const part2 = 'WI1RdTaWmAK6bnjcFyc';
const part3 = 'we1eb';

const API_KEY = part1 + part2 + part3;

const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

export async function fetchAstronomyPictureOfTheDay(): Promise<ApodResponse | null> {
    try {
        const response = await fetch(APOD_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApodResponse = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Ошибка при запросе к API NASA: ", error);
        return null;
    }
}
