import React, { useEffect, useState } from 'react';
import { fetchEvents } from '../api';  // Импортируем fetchEvents для получения списка мероприятий

const EventList = () => {
  const [events, setEvents] = useState([]);  // Стейт для хранения списка мероприятий
  const [loading, setLoading] = useState(true);  // Стейт для загрузки
  const [error, setError] = useState(null);  // Стейт для ошибок

  useEffect(() => {
    const loadEvents = async () => {
        try {
          console.log("Fetching events...");
          const data = await fetchEvents();  // Получаем список мероприятий
      
          // Логируем весь ответ от API для проверки структуры
          console.log("Fetched events data:", data);
      
          // Проверяем, если ответ содержит поле "data" и оно является массивом
          if (data && Array.isArray(data.data)) {
            setEvents(data.data);  // Сохраняем массив мероприятий из data в стейт
          } else {
            setError("Ошибка: данные не содержат массива мероприятий.");
            console.error("Data structure issue, expected 'data' field with array:", data);
          }
        } catch (error) {
          setError("Ошибка при загрузке списка мероприятий");
          console.error("Error fetching events:", error);  // Логируем ошибку
        } finally {
          setLoading(false);  // Останавливаем загрузку
        }
      };


    loadEvents();
  }, []);  // Эффект сработает только при монтировании компонента

  if (loading) {
    return <div>Loading...</div>;  // Показываем индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>;  // Показываем ошибку, если она есть
  }

  return (
    <div className="container mt-5">
      <h1>Список мероприятий</h1>
      {/* Проверка, является ли events массивом */}
      {Array.isArray(events) && events.length > 0 ? (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.info}</p>
              <a href={`/event/${event.id_name}`}>Подробнее</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нет доступных мероприятий.</p>
      )}
    </div>
  );
};

export default EventList;
