import { useState } from "react";
import React from 'react';
import type { FormEvent } from 'react';
import ConfirmationPage from './ConfirmationPage';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false); // 新しい状態を追加

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowConfirmation(true);
  }

  const handleGoBack = () => {
    setShowConfirmation(false);
  }

  const handleSubmitToServer = async () => {
    if (!formData.name || !formData.email ) {
      setResponseMessage('Please fill in all required fields.');
      return;
    }

    const formDataToSend = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      formDataToSend.append(key, value);
    }

    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formDataToSend,
    });

    const data = await response.json();
    if (data.message === "Success!") {
      setResponseMessage(data.message);
      setIsSubmitted(true); // 送信が成功したら状態を変更
    } else {
      setResponseMessage(data.message);
    }
  }

  return (
    <>
      {showConfirmation ? (
        <ConfirmationPage formData={formData} onGoBack={handleGoBack} />
      ) : isSubmitted ? ( // 送信が成功した場合の表示
        <div>
          <p>{responseMessage}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
          <div className="mb-6">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              名前
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              autoComplete="name"
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="email"
              required
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              autoComplete="off"
              
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            確認画面へ
          </button>
        </form>
      )}

      {responseMessage && <p className="mt-3 text-sm font-medium text-indigo-600">{responseMessage}</p>}
      {showConfirmation && (
        <button onClick={handleSubmitToServer}>送信する</button>
      )}
    </>
  );
}