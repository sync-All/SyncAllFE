

const LoadingAnimation = () => {
  return (
    <div className="h-screen">
      <div className="middle">
        <div className="bar bar1"></div>
        <div className="bar bar2"></div>
        <div className="bar bar3"></div>
        <div className="bar bar4"></div>
        <div className="bar bar5"></div>
        <div className="bar bar6"></div>
        <div className="bar bar7"></div>
        <div className="bar bar8"></div>
      </div>
      <style>{`
        body {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          background: inherit;
        }
        .middle {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          position: absolute;
        }
        .bar {
          width: 10px;
          height: 70px;
          background: #fff;
          display: inline-block;
          transform-origin: bottom center;
          border-top-right-radius: 20px;
          border-top-left-radius: 20px;
          animation: loader 1.2s linear infinite;
        }
        .bar1 {
          animation-delay: 0.1s;
        }
        .bar2 {
          animation-delay: 0.2s;
        }
        .bar3 {
          animation-delay: 0.3s;
        }
        .bar4 {
          animation-delay: 0.4s;
        }
        .bar5 {
          animation-delay: 0.5s;
        }
        .bar6 {
          animation-delay: 0.6s;
        }
        .bar7 {
          animation-delay: 0.7s;
        }
        .bar8 {
          animation-delay: 0.8s;
        }
        @keyframes loader {
          0% {
            transform: scaleY(0.1);
            background: ;
          }
          50% {
            transform: scaleY(1);
            background: #EFA705;
          }
          100% {
            transform: scaleY(0.1);
            background: transparent;
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingAnimation;
