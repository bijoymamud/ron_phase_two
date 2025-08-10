import { useSelector } from 'react-redux';
import React, { useState, useRef, useEffect } from 'react';

const Video = () => {
  const user = useSelector((state) => state.chatSlice.user);
  const hasSubscription = user?.subscription_plan;

  const videoId = hasSubscription ? 'LWHixRchlYc' : 'q4cFBVU0r7Q';
  const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef(null);

  // Lazy load iframe when it enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (iframeRef.current) observer.observe(iframeRef.current);

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    setIsLoaded(true);
  };

  return (
    <section className="md:pt-20 pt-6 md:px-4 pb-6 md:pb-10 px-2 bg-[#E0F7FF] dark:bg-[#E0F7FF]">
      <div className="max-w-6xl mx-auto">
        <div className="relative aspect-video group">
          {!isLoaded && (
            <img
              src={thumbnailUrl}
              alt="Video thumbnail"
              className="absolute inset-0 w-full h-full object-cover md:rounded-r-[50px] md:rounded-bl-[50px] rounded-r-[20px] rounded-bl-[20px] rounded-tl-lg cursor-pointer"
              onClick={handleClick}
            />
          )}
          <iframe
            ref={iframeRef}
            className="absolute inset-0 w-full h-full md:rounded-r-[50px] md:rounded-l-[50px] rounded-r-[20px] rounded-bl-[20px] rounded-tl-lg  shadow-lg"
            src={isLoaded ? videoUrl : ''}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export default React.memo(Video);