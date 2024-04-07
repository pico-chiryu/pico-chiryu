// ConfirmationPage.tsx
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
    <div className="confirmation-page">
      <h1>確認画面</h1>
      <p>ご用件: {formData.inquiry}</p>
      <p>お子様のお名前: {formData.childLastName} {formData.childFirstName}</p>
      <p>お子様のふりがな: {formData.childLastNameKana} {formData.childFirstNameKana}</p>
      <p>お子様の性別: {formData.childGender}</p>
      <p>お子様の現在の学年: {formData.childGrade}</p>
      <p>学校種別: {formData.schoolType}</p>
      <p>学校名: {formData.schoolName}</p>
      <p>お申込者: {formData.applicantType}</p>
      <p>郵便番号: {formData.postalCode}</p>
      <p>ご住所: {formData.prefecture} {formData.city} {formData.streetAddress} {formData.buildingName}</p>
      <p>お電話番号: {formData.phoneNumber}</p>
      <p>メールアドレス: {formData.email}</p>
      <p>メールアドレス(確認用): {formData.emailConfirmation}</p>
      <p>相談内容・ご質問: {formData.message}</p>
      <p>個人情報の取り扱い: {formData.privacyPolicy ? '同意する' : '同意しない'}</p>
      <button onClick={onGoBack}>修正する</button>
      <button>送信する</button>
    </div>
  );
};

export default ConfirmationPage;
