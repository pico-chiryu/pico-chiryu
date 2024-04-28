import { useState } from "react";
import React from 'react';
import type { FormEvent } from 'react';
import ConfirmationPage from './ConfirmationPage';
import LoadingIndicator from './LoadingIndicator';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', selectedDates: [] as { date: string, timeslot: string }[] });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, timeslot: string) => {
    const date = e.target.value;
    const isChecked = e.target.checked;
    let selectedDates = [...formData.selectedDates];
  
    if (isChecked) {
      selectedDates.push({ date, timeslot });
    } else {
      selectedDates = selectedDates.filter(d => !(d.date === date && d.timeslot === timeslot));
    }
  
    setFormData({ ...formData, selectedDates });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  }

  const handleGoBack = () => {
    setShowConfirmation(false);
  }

  const handleSubmitToServer = async () => {
    setIsLoading(true);
    setShowConfirmation(false);

    try {
      if (!formData.email) {
        setResponseMessage('Please fill in all required fields.');
        return;
      }

      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        if (key === 'selectedDates') {
          formDataToSend.append(key, JSON.stringify(value));
        } else {
          formDataToSend.append(key, value);
        }
      }

      const response = await fetch("/api/feedback", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();
      if (data.message === "送信に成功しました！") {
        console.log("送信に成功しました！");
        window.location.href = '/thank-you';
      } else {
        setResponseMessage(data.message);
      }
    } catch (error) {
      setResponseMessage('送信中にエラーが発生しました。もう一度試してください。');
    } finally {
      setIsLoading(false);
    }
  }

  const today = new Date();
  const oneMonthLater = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  const availableDates = [];

  for (let d = new Date(today); d <= oneMonthLater; d.setDate(d.getDate() + 1)) {
    availableDates.push(new Date(d));
  }

  return (
    <>
      {isLoading ? (
        <LoadingIndicator isLoading={isLoading} />
      ) : (
        <>
          {showConfirmation ? (
            <ConfirmationPage formData={formData} onGoBack={handleGoBack} />
          ) : isSubmitted ? (
            <div>
              <p>{responseMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
              {/* 他のフォーム項目 */}

              <div className="mb-6">
  <label className="block text-sm font-medium text-gray-700">
    振替希望日と時間帯 <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
  </label>
  <div className="mt-2">
    {availableDates.map((date, index) => (
      <div key={index} className="mb-4">
        <div className="flex items-center mb-2">
          <label htmlFor={`date-${index}`} className="ml-2 text-gray-700">
            {date.toLocaleDateString()}
          </label>
        </div>
        <div className="ml-6">
          {['16:20～', '18:00～', '19:40～'].map((timeslot, timeslotIndex) => (
            <div key={timeslotIndex} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`date-${index}-timeslot-${timeslotIndex}`}
                name="selectedDates"
                value={date.toISOString()}
                checked={formData.selectedDates.some(d => d.date === date.toISOString() && d.timeslot === timeslot)}
                onChange={(e) => handleDateChange(e, timeslot)}
                className="form-checkbox h-5 w-5 text-indigo-600 rounded"
              />
              <label htmlFor={`date-${index}-timeslot-${timeslotIndex}`} className="ml-2 text-gray-700">
                {timeslot}
              </label>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

              {/* 他のフォーム項目 */}

              <div className="flex justify-center mb-4">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 mb-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  確認画面へ
                </button>
              </div>
            </form>
          )}

          {responseMessage && <p className="mt-3 text-sm font-medium text-indigo-600">{responseMessage}</p>}
          {showConfirmation && (
            <div className="text-center mt-4 mb-8">
              <button
                onClick={handleSubmitToServer}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                入力内容を送信する
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}