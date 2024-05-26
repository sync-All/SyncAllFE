import {useState, useEffect} from 'react';

const AuthImageSlider = ({images, interval=3000}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      
    }, interval)

    return () => clearInterval(timer);
  }, [images.length, interval])

  return (
    <div className="relative w-full min-h-full ">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default AuthImageSlider;
