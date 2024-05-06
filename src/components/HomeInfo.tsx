

const arrow = "/icons/arrow.svg";

const HomeInfo = () => {
  return (
    <div className="info-box text-center">
      <h3
        className="text-4xl font-bold mb-4"
        style={{
          color: "#215364",
          // textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        新規開校！
      </h3>
      <p className="text-2xl mb-6">受験に役立つ一生モノの絶対暗算力！</p>
      <div className="relative">
        <a
          href="/contact-form"
          className="bg-[#01AD9F] text-white px-6 py-3 rounded-full shadow-lg font-semibold hover:bg-[#018E82] transition-colors duration-200"
        >
          無料体験はこちら！
        </a>
      </div>
    </div>
  );
};

export default HomeInfo;