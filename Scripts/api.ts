const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
const API_KEY = 'AkrAPSTudQbZDrOqWI1RdTaWmAK6bnjcFycwe1eb';

async function fetchAstronomyPictureOfTheDay() {
    try {
        const response = await fetch(APOD_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка при запросе к API NASA: ", error);
        return null;
    }
}
