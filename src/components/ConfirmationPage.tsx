import React from 'react';

interface ConfirmationPageProps {
  formData: {
    inquiry: string;
    childLastName: string;
    childFirstName: string;
    childLastNameKana: string;
    childFirstNameKana: string;
    childGender: string;
    childGrade: string;
    schoolType: string;
    schoolName: string;
    applicantType: string;
    postalCode: string;
    prefecture: string;
    city: string;
    streetAddress: string;
    buildingName: string;
    phoneNumber: string;
    email: string;
    emailConfirmation: string;
    message: string;
    privacyPolicy: boolean;
  };
  onGoBack: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ formData, onGoBack }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="confirmation-page max-w-lg w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">確認画面</h1>
        <div className="space-y-4">
          <p className="text-center text-gray-600">以下の内容でよろしいですか？</p>
          <div className="text-gray-500">
            <p>ご用件: <span className="text-gray-700 font-semibold">{formData.inquiry}</span></p>
            <p>お子様のお名前: <span className="text-gray-700 font-semibold">{formData.childLastName} {formData.childFirstName}</span></p>
            <p>お子様のふりがな: <span className="text-gray-700 font-semibold">{formData.childLastNameKana} {formData.childFirstNameKana}</span></p>
            <p>お子様の性別: <span className="text-gray-700 font-semibold">{formData.childGender === 'male' ? '男性' : formData.childGender === 'female' ? '女性' : '未選択'}</span></p>

            <p>お子様の現在の学年: <span className="text-gray-700 font-semibold">{formData.childGrade}</span></p>
            <p>学校種別: <span className="text-gray-700 font-semibold">{formData.schoolType}</span></p>
            <p>学校名: <span className="text-gray-700 font-semibold">{formData.schoolName}</span></p>
            <p>お申込者: <span className="text-gray-700 font-semibold">{formData.applicantType}</span></p>
            <p>郵便番号: <span className="text-gray-700 font-semibold">{formData.postalCode}</span></p>
            <p>ご住所: <span className="text-gray-700 font-semibold">{formData.prefecture} {formData.city} {formData.streetAddress} {formData.buildingName}</span></p>
            <p>お電話番号: <span className="text-gray-700 font-semibold">{formData.phoneNumber}</span></p>
            <p>メールアドレス: <span className="text-gray-700 font-semibold">{formData.email}</span></p>
            <p>メールアドレス(確認用): <span className="text-gray-700 font-semibold">{formData.emailConfirmation}</span></p>
            <p>相談内容・ご質問: <span className="text-gray-700 font-semibold">{formData.message}</span></p>
            <p>個人情報の取り扱い: <span className="text-gray-700 font-semibold">{formData.privacyPolicy ? '同意する' : '同意しない'}</span></p>
          </div>
          <div className="text-center mt-6">
            <button onClick={onGoBack} className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-[#019f8b] transition-colors">修正する</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;


