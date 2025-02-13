import React from 'react';
import { Link } from 'react-router-dom';

const Guide: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        <Link to="/" className="text-primary hover:text-primary-600 inline-flex items-center mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          На главную
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Руководство по использованию
        </h1>

        <div className="space-y-6">
          {/* Технические особенности */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Технические особенности
                </h2>
                <div className="space-y-3 text-gray-600">
                  <p className="text-sm md:text-base">
                    Приложение работает полностью на стороне браузера и использует локальное хранилище (localStorage) для сохранения вашего прогресса. Это означает:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4 text-sm md:text-base">
                    <li>Весь прогресс сохраняется только в текущем браузере на текущем устройстве</li>
                    <li>При очистке данных браузера или использовании режима инкогнито прогресс будет утерян</li>
                    <li>Для сохранения прогресса рекомендуется использовать одно устройство и браузер</li>
                    <li>Нет необходимости в подключении к интернету после первой загрузки приложения</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Функционал приложения */}
          <div className="bg-white rounded-xl shadow-sm p-4 md:p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Функционал приложения
                </h2>

                {/* Тренировка */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Режим тренировки
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="text-sm md:text-base">
                      Тренировка позволяет изучать вопросы по выбранным разделам:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm md:text-base">
                      <li>Выберите один или несколько разделов для тренировки</li>
                      <li>Система отберет до 10 случайных неизученных вопросов из выбранных разделов</li>
                      <li>При правильном ответе вопрос помечается как изученный в данном разделе</li>
                      <li>При неправильном ответе статус вопроса не меняется</li>
                      <li>После завершения тренировки вы увидите подробный разбор ответов</li>
                    </ul>
                  </div>
                </div>

                {/* Экзамен */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Режим экзамена
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="text-sm md:text-base">
                      Экзамен проверяет ваши знания по всем разделам:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm md:text-base">
                      <li>14 случайных вопросов из всей базы</li>
                      <li>30 минут на выполнение</li>
                      <li>Для сдачи необходимо ответить правильно минимум на 12 вопросов</li>
                      <li>При неправильном ответе на изученный вопрос, он снова становится неизученным</li>
                      <li>История экзаменов сохраняется</li>
                    </ul>
                  </div>
                </div>

                {/* Методичка */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Методичка
                  </h3>
                  <div className="space-y-3 text-gray-600">
                    <p className="text-sm md:text-base">
                      Раздел методички предоставляет доступ ко всем материалам:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-sm md:text-base">
                      <li>Просмотр всех вопросов по разделам</li>
                      <li>Отображение правильных ответов</li>
                      <li>Визуальное выделение изученных вопросов</li>
                      <li>Удобная навигация по разделам</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide; 