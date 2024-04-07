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
    if (!formData.email ) {
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
          <label htmlFor="inquiry" className="block text-sm font-medium text-gray-700">
            ご用件 <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
          </label>
          <select
            id="inquiry"
            name="inquiry"
            value={formData.inquiry}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="説明会・体験授業">無料個別説明会・体験授業のお申し込み</option>
            <option value="資料請求">資料請求のお問い合わせ</option>
          </select>
        </div>
      
        <div className="mb-6">
          <label htmlFor="childName" className="block text-sm font-medium text-gray-700">
            お子様のお名前 <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
          </label>
          <div className="flex">
            <div className="mr-4">
              <input
                type="text"
                id="childLastName"
                name="childLastName"
                value={formData.childLastName}
                onChange={handleInputChange}
                placeholder="姓"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                id="childFirstName"
                name="childFirstName"
                value={formData.childFirstName}
                onChange={handleInputChange}
                placeholder="名"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      
        <div className="mb-6">
          <label htmlFor="childNameKana" className="block text-sm font-medium text-gray-700">
            ふりがな <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
          </label>
          <div className="flex">
            <div className="mr-4">
              <input
                type="text"
                id="childLastNameKana"
                name="childLastNameKana"
                value={formData.childLastNameKana}
                onChange={handleInputChange}
                placeholder="姓"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input
                type="text"
                id="childFirstNameKana"
                name="childFirstNameKana"
                value={formData.childFirstNameKana}
                onChange={handleInputChange}
                placeholder="名"
                required
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      
        <div className="mb-6">
          <label htmlFor="childGender" className="block text-sm font-medium text-gray-700">
            お子様の性別 <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
          </label>
          <div className="mt-2">
            <div>
              <label htmlFor="male" className="inline-flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="childGender"
                  value="male"
                  checked={formData.childGender === 'male'}
                  onChange={handleInputChange}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">男性</span>
              </label>
            </div>
            <div>
              <label htmlFor="female" className="inline-flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="childGender"
                  value="female"
                  checked={formData.childGender === 'female'}
                  onChange={handleInputChange}
                  className="form-radio h-5 w-5 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">女性</span>
              </label>
            </div>
          </div>
        </div>
      
        <div className="mb-6">
          <label htmlFor="childGrade" className="block text-sm font-medium text-gray-700">
            お子様の現在の学年 <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
          </label>
          <select
            id="childGrade"
            name="childGrade"
            value={formData.childGrade}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">選択してください</option>
            <option value="年少">年少</option>
            <option value="年中">年中</option>
            <option value="年長">年長</option>
            <option value="小1">小1</option>
            <option value="小2">小2</option>
            <option value="小3">小3</option>
            <option value="小4">小4</option>
            <option value="小5">小5</option>
            <option value="小6">小6</option>
            <option value="中1">中1</option>
            <option value="中2">中2</option>
            <option value="中3">中3</option>
            {/* <option value="高1">高1</option>
            <option value="高2">高2</option>
            <option value="高3">高3</option>
            <option value="既卒">既卒</option> */}
          </select>
        </div>
      
        <div className="mb-6">
          <label htmlFor="schoolType" className="block text-sm font-medium text-gray-700">
            学校名
          </label>
          <div className="flex">
            <div className="mr-4">
              <select
                id="schoolType"
                name="schoolType"
                value={formData.schoolType}
                onChange={handleInputChange}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">選択してください</option>
                <option value="都道府県立">都道府県立</option>
                <option value="市区町村立">市区町村立</option>
                <option value="私立">私立</option>
                <option value="その他">その他</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                id="schoolName"
                name="schoolName"
                value={formData.schoolName}
                onChange={handleInputChange}
                placeholder="お通いの学校名をご記入ください"
                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            お通いの学校名をご記入いただくと、学校に合わせた情報もお伝えすることができます。私立中学生・高校生は必ずご入力ください。
    </p>
  </div>

  <div className="mb-6">
    <label htmlFor="applicantType" className="block text-sm font-medium text-gray-700">
      お申込者 <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
    </label>
    <select
      id="applicantType"
      name="applicantType"
      value={formData.applicantType}
      onChange={handleInputChange}
      required
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    >
      <option value="">選択してください</option>
      <option value="保護者">保護者</option>
      <option value="本人">本人</option>
      <option value="その他">その他</option>
    </select>
  </div>

  <div className="mb-6">
    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
      郵便番号
    </label>
    <p className="mt-1 text-sm text-gray-500">
      資料送付をご希望の方は、必ずご入力ください
    </p>
    <input
      type="text"
      id="postalCode"
      name="postalCode"
      value={formData.postalCode}
      onChange={handleInputChange}
      placeholder="〒 -"
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="prefecture" className="block text-sm font-medium text-gray-700">
      ご住所
    </label>
    <div className="flex">
      <div className="mr-4">
        <select
          id="prefecture"
          name="prefecture"
          value={formData.prefecture}
          onChange={handleInputChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">選択</option>
          <option value="愛知県">愛知県</option>
          {/* 他の都道府県のオプションは省略 */}
        </select>
      </div>
      <div>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
          placeholder="市区町村名"
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>
    </div>
    <div className="mt-2">
      <input
        type="text"
        id="streetAddress"
        name="streetAddress"
        value={formData.streetAddress}
        onChange={handleInputChange}
        placeholder="番地"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
    <div className="mt-2">
      <input
        type="text"
        id="buildingName"
        name="buildingName"
        value={formData.buildingName}
        onChange={handleInputChange}
        placeholder="ビル・マンション名等"
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </div>

  <div className="mb-6">
    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
      お電話番号 <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
    </label>
    <p className="mt-1 text-sm text-gray-500">
      携帯番号などつながりやすい番号をご入力ください。
    </p>
    <input
      type="tel"
      id="phoneNumber"
      name="phoneNumber"
      value={formData.phoneNumber}
      onChange={handleInputChange}
      placeholder="-"
      required
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
      メールアドレス <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
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
    <label htmlFor="emailConfirmation" className="block text-sm font-medium text-gray-700">
      メールアドレス（確認用） <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
    </label>
    <input
      type="email"
      id="emailConfirmation"
      name="emailConfirmation"
      value={formData.emailConfirmation}
      onChange={handleInputChange}
      autoComplete="email"
      required
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>

  <div className="mb-6">
    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
      相談内容・ご質問
    </label>
    <p className="mt-1 text-sm text-gray-500">
      相談したい内容・ご質問などございましたらご入力ください。
      なお、２営業日以内に担当者よりお電話で確認のご連絡をさせていただきますが、ご都合の悪い時間帯等ございましたら、併せてご記入ください。
    </p>
    <textarea
      id="message"
      name="message"
      value={formData.message}
      onChange={handleInputChange}
      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
    />
  </div>

  <div className="mb-6">
    <div className="flex items-center">
      <input
        id="privacyPolicy"
        name="privacyPolicy"
        type="checkbox"
        checked={formData.privacyPolicy}
        onChange={handleInputChange}
        required
        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label htmlFor="privacyPolicy" className="ml-2 block text-sm text-gray-900">
        個人情報の取り扱い <span className="bg-orange-500 text-white px-1.5 py-0.5 rounded font-semibold text-xs">必須</span>
      </label>
    </div>
    <p className="mt-2 text-sm text-gray-500">
個人情報の取り扱いについては<a
     href="#"
     className="font-medium text-indigo-600 hover:text-indigo-500"
   >
こちら
</a>
をご確認ください。
</p>

</div>
<button
type="submit"
className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
確認画面へ
</button> </form>
      )}

      {responseMessage && <p className="mt-3 text-sm font-medium text-indigo-600">{responseMessage}</p>}
      {showConfirmation && (
        <button onClick={handleSubmitToServer}>送信する</button>
      )}
    </>
  );
}