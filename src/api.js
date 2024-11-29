import axios from 'axios';
import md5 from 'crypto-js/md5';

const API_KEY = 'uofeiZ7o';
const API_SECRET = 'Waeboh1u';
const API_URL = 'https://api.runet.id';

// Функция для генерации hash
const getHash = (time) => {
  return md5(API_KEY + time + API_SECRET).toString();
};

// Функция для получения списка мероприятий
export const fetchEvents = async (limit = 30, offset = 0) => {
  const time = Math.floor(Date.now() / 1000);  // Получаем текущий unix timestamp
  const hash = getHash(time);  // Генерируем hash

  // Логируем запрос
  console.log("Fetching events...");
  console.log(`API URL: ${API_URL}/event/list?limit=${limit}&offset=${offset}`);
  console.log(`Using headers: ApiKey: ${API_KEY}, Hash: ${hash}, Time: ${time}`);

  try {
    const response = await axios.get('https://api.runet.id/event/list', {
      headers: {
        ApiKey: API_KEY,
        Hash: hash,
        Time: time,
      },
      params: {
        'limit': 20,
        'offset': 0,  // Смещение
        'filter[type_id]': 2,
      }
    });

    // Логируем успешный ответ
    console.log("API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error.response || error);
    throw error;
  }
};

// Функция для получения мероприятия по alias
export const fetchEventByAlias = async (alias) => {
  const time = Math.floor(Date.now() / 1000);  // Получаем текущий unix timestamp
  const hash = getHash(time);  // Генерируем hash

  // Логируем запрос
  console.log("Making request to API...");
  console.log(`API URL: ${API_URL}/event/${alias}`);
  console.log(`Using headers: ApiKey: ${API_KEY}, Hash: ${hash}, Time: ${time}`);

  try {
    const response = await axios.get(`${API_URL}/event/${alias}`, {
      headers: {
        ApiKey: API_KEY,
        Hash: hash,
        Time: time,
      },
    });

    // Логируем успешный ответ
    console.log("API Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error fetching event details:", error.response || error);
    throw error;  // Пробрасываем ошибку
  }
};
