import React, { useRef, useState } from "react";
import { gsap } from "gsap";

export default function GridGallery() {
  const pictures = [
    {
      name: "Emily Watson",
      imgSrc: "img1.webp",
      color: "#ffe4e1",
      textColor: "#000",
    },
    {
      name: "John Carter",
      imgSrc: "img2.webp",
      color: "#e0ffff",
      textColor: "#333",
    },
    {
      name: "Sophie Turner",
      imgSrc: "img3.webp",
      color: "#fafad2",
      textColor: "#000",
    },
    {
      name: "Liam Scott",
      imgSrc: "img4.webp",
      color: "#d8bfd8",
      textColor: "#222",
    },
    {
      name: "Ava Brooks",
      imgSrc: "img5.webp",
      color: "#ffe4b5",
      textColor: "#111",
    },
    {
      name: "Noah Davis",
      imgSrc: "img6.webp",
      color: "#98fb98",
      textColor: "#000",
    },
    {
      name: "Chloe Adams",
      imgSrc: "img7.webp",
      color: "#afeeee",
      textColor: "#111",
    },
    {
      name: "Mason Reed",
      imgSrc: "img8.webp",
      color: "#e6e6fa",
      textColor: "#333",
    },
    {
      name: "Ella White",
      imgSrc: "img9.webp",
      color: "#fffacd",
      textColor: "#000",
    },
    {
      name: "James Hill",
      imgSrc: "img10.webp",
      color: "#f5deb3",
      textColor: "#000",
    },
    {
      name: "Grace Hall",
      imgSrc: "img11.webp",
      color: "#f0e68c",
      textColor: "#222",
    },
    {
      name: "Logan King",
      imgSrc: "img12.webp",
      color: "#add8e6",
      textColor: "#111",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({});
  const overlayImageRef = useRef(null);
  const overlayTextRef = useRef(null);
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);
  const expanderRef = useRef(null);

  const handleClick = (src, target) => {
    if (isOpen) return;

    const rect = target.getBoundingClientRect();
    const { top, left, width, height } = rect;

    const img = overlayImageRef.current;
    const text = overlayTextRef.current;
    const bg = backdropRef.current;
    const closeBtn = closeBtnRef.current;
    const expander = expanderRef.current;

    setClickedItem(src);
    img.src = `/assets/${src.imgSrc}`;
    setIsOpen(true);

    gsap.set(expander, {
      top,
      left,
      width,
      height,
      position: "fixed",
      backgroundColor: clickedItem.color,
      zIndex: 45,
      display: "block",
    });

    const tl = gsap.timeline();

    tl.to(expander, {
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      duration: 0.5,
      ease: "power2.inOut",
    });

    tl.set(img, {
      scale: 1,
      opacity: 1,
      top: "50%",
      left: "50%",
      xPercent: -50,
      yPercent: -50,
      position: "fixed",
      zIndex: 50,
    });

    tl.to(
      bg,
      {
        opacity: 1,
        duration: 0.3,
        ease: "power1.out",
      },
      "-=0.4"
    );

    tl.fromTo(
      img,
      {
        scale: 0.5,
        opacity: 0,
      },
      {
        scale: 2,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }
    );

    tl.to(
      [text, closeBtn],
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );
  };

  const handleClose = () => {
    const img = overlayImageRef.current;
    const text = overlayTextRef.current;
    const bg = backdropRef.current;
    const closeBtn = closeBtnRef.current;
    const expander = expanderRef.current;

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        gsap.set(expander, { display: "none" });
      },
    });

    tl.to([text, closeBtn], {
      opacity: 0,
      x: 10,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(img, {
      scale: 0.5,
      rotateY: 2,
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    });

    tl.to(
      bg,
      {
        opacity: 0,
        duration: 0.3,
      },
      "-=0.2"
    );

    tl.to(
      expander,
      {
        width: 0,
        height: 0,
        duration: 0.4,
        ease: "power2.inOut",
      },
      "<"
    );
  };

  const getGridChunks = (arr) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += 3) {
      chunks.push(arr.slice(i, i + 3));
    }
    return chunks;
  };

  return (
    <div className="max-w-screen min-h-screen bg-black text-white px-8 py-12 relative overflow-hidden">
      <div className="flex justify-between items-center  border-b-2 mb-7 border-white ">
        <h1 className="text-3xl font-bold ">Shane Weber</h1>
        <h1 className="text-3xl font-bold">grid+color</h1>
      </div>

      <div className="space-y-7">
        {getGridChunks(pictures).map((chunk, index) => (
          <div
            key={index}
            className={`grid grid-cols-3 gap-6 ${
              index % 2 === 1 ? "flex-row-reverse" : ""
            }`}
          >
            {chunk.length === 3 ? (
              <>
                {index % 2 === 0 ? (
                  <>
                    <div className="col-span-2">
                      <img
                        src={`/assets/${chunk[0].imgSrc}`}
                        className="w-full h-[400px] object-cover object-top rounded-md cursor-pointer"
                        onClick={(e) => handleClick(chunk[0], e.target)}
                      />
                    </div>
                    <div className="grid grid-rows-2 gap-6">
                      {chunk.slice(1).map((item, i) => (
                        <div key={i}>
                          <img
                            src={`/assets/${item.imgSrc}`}
                            className="w-full h-[190px] object-cover object-top rounded-md cursor-pointer"
                            onClick={(e) => handleClick(item, e.target)}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-rows-2 gap-6">
                      {chunk.slice(0, 2).map((item, i) => (
                        <div key={i}>
                          <img
                            src={`/assets/${item.imgSrc}`}
                            className="w-full h-[190px] object-cover object-top rounded-md cursor-pointer"
                            onClick={(e) => handleClick(item, e.target)}
                          />
                        </div>
                      ))}
                    </div>
                    <div className="col-span-2">
                      <img
                        src={`/assets/${chunk[2].imgSrc}`}
                        className="w-full h-[400px] object-cover object-center rounded-md cursor-pointer"
                        onClick={(e) => handleClick(chunk[2], e.target)}
                      />
                    </div>
                  </>
                )}
              </>
            ) : (
              chunk.map((item, i) => (
                <div key={i}>
                  <img
                    src={`/assets/${item.imgSrc}`}
                    className="w-full h-[300px] object-cover object-left-top rounded-md cursor-pointer"
                    onClick={(e) => handleClick(item, e.target)}
                  />
                </div>
              ))
            )}
          </div>
        ))}
      </div>

      {/* Overlay layers */}
      <div ref={expanderRef} className="fixed bg-white z-40 hidden" />
      <div
        ref={backdropRef}
        className="fixed inset-0 backdrop-blur-[40px]  opacity-0 z-40 pointer-events-none"
      />
      <img
        ref={overlayImageRef}
        alt="zoomed"
        className="opacity-0 w-40 h-60 shadow-xl rounded-lg z-50 object-cover object-top"
      />
      <div
        ref={overlayTextRef}
        className="fixed top-1/2 right-10 -translate-y-1/2 opacity-0 translate-x-10 z-50"
        style={{
          width: "33%",
          padding: "2rem",
          borderRadius: "1rem",
          color: clickedItem.textColor,
        }}
      >
        <h2 className="text-5xl font-bold">{clickedItem.name}</h2>
        <p className="text-md mt-2">We are the models</p>
      </div>
      <button
        ref={closeBtnRef}
        onClick={handleClose}
        className="fixed top-10 right-10 opacity-0 z-50 font-bold text-2xl px-4 py-2 rounded"
        style={{
          color: clickedItem.textColor,
        }}
      >
        X
      </button>
    </div>
  );
}
