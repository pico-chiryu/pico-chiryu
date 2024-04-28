// Slider.tsx
import React, { useState,useEffect } from 'react';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';


// スライドを表現する型を定義
type Slide = {
  type: 'image' | 'html';
  content: string; // 画像のURLまたはHTMLコンテンツ
};

const Slider: React.FC = () => {
  const slides: Slide[] = [
    { type: 'image', content: "/images/female.png" },
    { 
      type: 'html', 
      content: `
        <div class='w-full h-full flex flex-col justify-center items-center' style='background-color: #BEFEE2;'>
        <p class='text-4xl font-bold text-center animate-slow-bounce' style='color: #005a4c;'>新規開校！</p>
          <p class='text-xl text-center mt-4' style='color: #005a4c;'>受験に役立つ一生モノの絶対暗算力！</p>
        </div>
      ` 
    },
    
    
    
    { type: 'image', content: "/images/male.png" },
    { 
      type: 'html', 
      content: `
        <div class='w-full h-full flex flex-col justify-center items-center' style='background-color: #BEFEE2;'>
          <p class='text-4xl font-bold text-center animate-slow-bounce' style='color: #005a4c;'>無料体験受付中！</p>
          <p class='text-xl text-center mt-4' style='color: #005a4c;'>生涯役立つ右脳教育！</p>
        </div>
      ` 
    },
    
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const slideDuration = 5000; // 5秒ごとにスライドを切り替える

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

   // 自動スライド切り替え機能
   useEffect(() => {
    const slideInterval = setInterval(() => {
      nextSlide();
    }, slideDuration);

    return () => clearInterval(slideInterval);
  }, [currentIndex]);

  const renderSlide = (slide: Slide) => {
    if (slide.type === 'image') {
      return <div style={{ backgroundImage: `url(${slide.content})` }} className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>;
    } else if (slide.type === 'html') {
      return <div className='w-full h-full flex justify-center items-center' dangerouslySetInnerHTML={{ __html: slide.content }}></div>;
    }
  };

  return (
    <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
       {renderSlide(slides[currentIndex])}
      {/* Left Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className='flex top-4 justify-center py-2'>
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className='text-2xl cursor-pointer'
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
   
    </div>

    
  );
};

export default Slider;



