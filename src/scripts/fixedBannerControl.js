document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('fixedBottomBanner');
    if (!banner) return;
  
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
      banner.style.display = isBottom ? 'none' : '';
    };
  
    window.addEventListener('scroll', handleScroll);
  });
  