document.addEventListener('DOMContentLoaded', (event) => {
  const banner = document.getElementById('fixedBottomBanner');

  const handleScroll = () => {
    if (!banner) return;
    // ウィンドウのスクロール位置 + ウィンドウの高さが、ドキュメントの高さと同じかそれ以上の場合、バナーを非表示
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      banner.style.display = 'none';
    } else {
      banner.style.display = 'block'; // それ以外の場合は表示
    }
  };

  window.addEventListener('scroll', handleScroll);
});
