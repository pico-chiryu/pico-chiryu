import React, { useState } from 'react';

const TestButton: React.FC = () => {
  const [text, setText] = useState('クリック前のテキスト');

  return (
    <div>
      <button onClick={() => setText('クリック後のテキスト')}>クリックして変更</button>
      <p>{text}</p>
    </div>
  );
};

export default TestButton;
