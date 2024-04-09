// バナー制御用のクライアントサイドスクリプト
const handleScroll = () => {
  const banner = document.getElementById('fixedBottomBanner');
  if (!banner) return;

  // ウィンドウのスクロール位置 + ウィンドウの高さが、ドキュメントの高さと同じかそれ以上の場合、バナーを非表示
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    banner.style.display = 'none';
  } else {
    banner.style.display = 'block'; // それ以外の場合は表示
  }
};

// クライアント側でのみ実行
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', handleScroll);
  window.addEventListener('load', handleScroll); // ページ読み込み時にもチェック
}

// Astroページから離れる時にイベントリスナーをクリーンアップ
useEffect(() => {
  return () => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('load', handleScroll);
  };
}, []);
  