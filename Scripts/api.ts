// TypeScript: Определение интерфейса для ответа API NASA
interface ApodResponse {
    url: string;
    title: string;
    explanation: string;
}

const API_KEY = 'AkrAPSTudQbZDrOqWI1RdTaWmAK6bnjcFycwe1eb'; 
const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;

// TypeScript: функция для запроса к API с уточнённым возвращаемым типом
export async function fetchAstronomyPictureOfTheDay(): Promise<ApodResponse | null> {
    try {
        const response = await fetch(APOD_URL);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: ApodResponse = await response.json();
    console.log(data); // Временно добавить для проверки ответа
    return data;
    
    } catch (error) {
        console.error("Ошибка при запросе к API NASA: ", error);
        return null;
    }
}