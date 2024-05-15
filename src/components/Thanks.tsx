import React from "react";

function Thanks() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "80vh", backgroundColor: "#BEFEE0", color: "#215364", textAlign: "center" }}>
      <h1 className="text-4xl font-bold mb-8">ありがとうございました！</h1>
      <p className="text-xl mb-12">
        お問い合わせいただき、誠にありがとうございます。
        <br />
        確認後、担当者よりご連絡いたします。
      </p>
      <a href="/" className="text-xl text-indigo-600 hover:text-indigo-800">
        トップページに戻る
      </a>
    </div>
  );
}

export default Thanks;