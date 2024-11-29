import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';  // Для получения параметров из URL
import { fetchEventByAlias } from '../api';  // Импортируем fetchEventByAlias для получения данных мероприятия

const EventDetail = () => {
  const { alias } = useParams();  // Получаем alias из URL
  const [event, setEvent] = useState(null);  // Стейт для хранения данных мероприятия
  const [loading, setLoading] = useState(true);  // Стейт для состояния загрузки
  const [error, setError] = useState(null);  // Стейт для ошибок

  useEffect(() => {
    const loadEvent = async () => {
      try {
        console.log("Fetching event by alias:", alias);  // Логируем alias
        const data = await fetchEventByAlias(alias);  // Получаем данные мероприятия
        console.log("Fetched event data:", data);  // Логируем ответ от API
  
        if (data && data.id) {
          setEvent(data);  // Если данные получены, сохраняем их в стейт
        } else {
          setError("Мероприятие не найдено.");  // Если данных нет
        }
      } catch (error) {
        console.error("Error fetching event:", error);  // Логируем ошибку
        setError("Ошибка при загрузке мероприятия");
      } finally {
        setLoading(false);  // Останавливаем загрузку
      }
    };
  
    loadEvent();
  }, [alias]);  // Загружаем мероприятие при изменении alias в URL

  if (loading) {
    return <div>Loading...</div>;  // Показываем индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>;  // Показываем ошибку, если она есть
  }

  return (
    <div className="container mt-5">
      <h1>{event?.title}</h1> {/* Отображаем заголовок мероприятия */}
      <p>{event?.info}</p>   {/* Отображаем краткое описание */}
      <img src={event?.logo_source} alt={event?.title} /> {/* Логотип мероприятия */}
      <p>{event?.full_info}</p> {/* Полное описание */}
      <p>Дата начала: {event?.start_time}</p> {/* Дата начала */}
      <p>Дата окончания: {event?.end_time}</p> {/* Дата окончания */}
    </div>
  );
};

export default EventDetail;
