

const FixedBottomBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-primary px-4 py-3 sm:px-6 flex justify-between items-center">
      <div className="text-white font-semibold">
        無料体験・資料請求はこちら
      </div>
      <a href="/about" legacyBehavior>
        <a className="bg-white text-primary px-4 py-2 rounded-md shadow-sm font-semibold hover:bg-gray-100 transition-colors duration-200">
          無料で申し込む
        </a>
      </a>
    </div>
  )
}

export default FixedBottomBanner