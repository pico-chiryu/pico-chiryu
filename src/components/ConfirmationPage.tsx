// ConfirmationPage.tsx
import React from 'react';

interface ConfirmationPageProps {
  formData: { name: string; email: string; message: string };
  onGoBack: () => void;
}

const ConfirmationPage: React.FC<ConfirmationPageProps> = ({ formData, onGoBack }) => {
  return (
    <div className="confirmation-page">
      <h1>Confirmation Page</h1>
      <p>名前: {formData.name}</p>
      <p>Email: {formData.email}</p>
      <p>Message: {formData.message}</p>
      <button onClick={onGoBack}>修正する</button>
      <a href="/">Go back to home</a>
    </div>
  );
};

export default ConfirmationPage;
