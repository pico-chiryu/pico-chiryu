import React from 'react';

const Greeting: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4 text-[#01AD9F]">はじめに</h2>
      <p className="mb-8">
        そろばん塾へようこそ。私たちは、子どもたちがそろばんを通じて計算力だけでなく、集中力や記憶力を養うことができるようサポートしています。
      </p>

      <div className="flex items-center mb-8">
        <img src="images/usami.png" alt="塾長画像" className="w-32 h-32 rounded-full mr-6" />
        <div>
          <h3 className="text-2xl font-bold mb-2 text-[#01AD9F]">塾長からのメッセージ</h3>
          <p>
            皆様、こんにちは。そろばん塾の塾長、宇佐美秀樹です。私たちの塾では、一人ひとりのペースに合わせた指導を心掛けています。そろばん学習を通じて、子どもたちの未来がより輝かしいものになるよう、全力を尽くして参ります。
          </p>
        </div>
      </div>

      <h4 className="text-xl font-bold mb-2 text-[#01AD9F]">そろばん学習の重要性</h4>
      <p className="mb-8">
        そろばんは、計算力を鍛えるだけでなく、右脳を活性化させる効果があります。また、繰り返しの練習を通じて、忍耐力や集中力も養うことができます。
      </p>

      <h5 className="text-lg font-bold mb-2 text-[#01AD9F]">私たちの指導方針</h5>
      <ol className="list-decimal list-inside mb-8">
        <li>一人ひとりに合わせた個別指導</li>
        <li>基礎から応用まで、段階的に学習</li>
        <li>楽しみながら学べる環境作り</li>
      </ol>

      <h6 className="text-base font-bold mb-2 text-[#01AD9F]">ご質問・お問い合わせ</h6>
      <p>
        何かご不明な点がございましたら、お気軽にお問い合わせください。一緒に子どもたちの成長をサポートできることを楽しみにしています。
      </p>
    </div>
  );
};

export default Greeting;