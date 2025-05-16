import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import Marquee from "react-fast-marquee";

export default function ImageContainer() {
  const pictures = [
    { name: "Emily Watson", imgSrc: "img1.webp" },
    { name: "John Carter", imgSrc: "img2.webp" },
    { name: "Sophie Turner", imgSrc: "img3.webp" },
    { name: "Liam Scott", imgSrc: "img4.webp" },
    { name: "Ava Brooks", imgSrc: "img5.webp" },
    { name: "Noah Davis", imgSrc: "img6.webp" },
    { name: "Chloe Adams", imgSrc: "img7.webp" },
    { name: "Mason Reed", imgSrc: "img8.webp" },
    { name: "Ella White", imgSrc: "img9.webp" },
    { name: "James Hill", imgSrc: "img10.webp" },
    { name: "Grace Hall", imgSrc: "img11.webp" },
    { name: "Logan King", imgSrc: "img12.webp" },
    { name: "Mia Green", imgSrc: "img13.webp" },
    { name: "Lucas Scott", imgSrc: "img14.webp" },
    { name: "Lily Wood", imgSrc: "img15.webp" },
    { name: "Benjamin Lee", imgSrc: "img16.webp" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [clickedItem, setClickedItem] = useState({});
  const overlayImageRef = useRef(null);
  const overlayTextRef = useRef(null);
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);
  const expanderRef = useRef(null);

  const handleClick = (src, clickX, clickY, target) => {
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

    // Position the expander div at the image's position
    gsap.set(expander, {
      top,
      left,
      width,
      height,
      position: "fixed",
      backgroundColor: "white",
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
      left: "30%",
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
      rotateY:2,
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

    tl.to(expander, {
      width: 0,
      height: 0,
      duration: 0.4,
      ease: "power2.inOut",
    },"<");
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black text-white p-4">
      <h1 className="text-7xl font-semibold capitalize mb-10">Shane Weber</h1>

      <Marquee pauseOnHover speed={60} gradient={false}>
        {pictures.map((item, index) => (
          <div key={index} className="flex flex-col items-center mx-6">
            <img
              src={`/assets/${item.imgSrc}`}
              alt="grid"
              className="w-60 h-80 object-cover rounded-md cursor-pointer"
              onClick={(e) => handleClick(item, e.clientX, e.clientY, e.target)}
            />
            <h1 className="text-md mt-2 font-bold">{item.name}</h1>
          </div>
        ))}
      </Marquee>
      

      {/* Expander Layer */}
      <div ref={expanderRef} className="fixed bg-white z-40 hidden" />

      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="fixed inset-0 backdrop-blur-[50px] bg-black opacity-0 z-40 pointer-events-none"
      />

      {/* Enlarged Image */}
      <img
        ref={overlayImageRef}
        alt="zoomed"
        className="opacity-0 w-40 h-60 shadow-xl rounded-lg z-50 object-cover object-center"
      />

      {/* Animated Text */}
      <div
        ref={overlayTextRef}
        className="fixed top-1/2 right-10 -translate-y-1/2 opacity-0 translate-x-10 text-black w-1/3 z-50"
      >
        <h2 className="text-7xl font-bold">{clickedItem.name}</h2>
        <p className="text-md mt-2">We are the models</p>
      </div>

      {/* Close Button */}
      <button
        ref={closeBtnRef}
        onClick={handleClose}
        className="fixed top-10 right-10 opacity-0 z-50 text-lg bg-white text-black head text-md text-bold px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
