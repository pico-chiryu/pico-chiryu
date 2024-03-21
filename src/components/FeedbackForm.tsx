import { useState } from "react";
import React from 'react';
import type { FormEvent } from 'react';

export default function Form() {
  const [responseMessage, setResponseMessage] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const response = await fetch("/api/feedback", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (data.message) {
      setResponseMessage(data.message);
    }
  }

  return (
    <form onSubmit={submit} className="max-w-md mx-auto mt-8">
      <div className="mb-6">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          名前
        </label>
        <input type="text" id="name" name="name" autoComplete="name"
          required
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input type="email" id="email" name="email" autoComplete="email"
          required
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <textarea id="message" name="message" autoComplete="off"
          required
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Send
      </button>
      {responseMessage && <p className="mt-3 text-sm font-medium text-indigo-600">{responseMessage}</p>}
    </form>
  );
}
