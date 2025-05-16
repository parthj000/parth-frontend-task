import React, { useRef, useState } from "react";
import { gsap } from "gsap";

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
  const [clickedItem,setClickedItem] = useState({});
  const overlayImageRef = useRef(null);
  const overlayTextRef = useRef(null);
  const backdropRef = useRef(null);
  const closeBtnRef = useRef(null);

  const handleClick = (src,clickX,clickY) => {

    if(isOpen){
        return;
    }
    const img = overlayImageRef.current;
    const text = overlayTextRef.current;
    const bg = backdropRef.current;
    const closeBtn = closeBtnRef.current;

    setClickedItem(src);

    img.src = `/assets/${src.imgSrc}`;

    setIsOpen(true);


    gsap.set(img, {
      scale: 1,
      opacity: 1,
      top: clickY,
      left: clickX,
      position: "fixed",
      zIndex: 50,
    });

   
    


   

    const tl = gsap.timeline();

    tl.to(bg, {
      opacity: 1,
      duration: 0.3,
      ease: "power1.out",
    });

    tl.set(img, {
      transformPerspective: 800,
      rotationY: 0,
    });

    tl.to(img, {
      rotationY: 360,
      duration: 0.8,
      ease: "power2.out",
    });

    tl.to(img, {
      scale: 2,
      top: "50%",
      left: "30%",
      xPercent: -50,
      yPercent: -50,
      duration: 0.6,
      ease: "power2.inOut",
    },"<");

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

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
      },
    });

    tl.to([text, closeBtn], {
      opacity: 0,
      x: 10,
      duration: 0.3,
      ease: "power2.in",
    });

    tl.to(img ,{
      left: "-30%",
      
      duration: 0.4,
      ease: "power2.inOut",
    });

    tl.to([img,bg], {
      opacity: 0,
      duration: 0.3,
    });

   
  };

  return (
    <div className="md:w-screen p-4 md:h-screen relative overflow-hidden">
      <h1 className="text-7xl head font-semibold capitalize mb-4">Shane Weber</h1>

      <div className="h-full grid grid-cols-4 md:gap-8 gap-1 md:grid-cols-8">
        {pictures.map((item, index) => (
          <div key={index} className="flex flex-col mb-5 items-end">
            <img
              src={`/assets/${item.imgSrc}`}
              alt="some image"
              className="object-cover object-center w-40 h-40 hover:cursor-pointer"
              onClick={(event) =>
                handleClick(item, event.clientX, event.clientY)
              }
            />
            <h1 className="text-md font-bold">{item.name}</h1>
          </div>
        ))}
      </div>

      <div
        ref={backdropRef}
        className="fixed inset-0 backdrop-blur-[50px] bg-[#000000]  opacity-0 z-40 pointer-events-none "
      />

      {/* Enlarged Image */}
      <img
        ref={overlayImageRef}
        alt="zoomed"
        className="opacity-0 w-48 h-48  z-50 object-cover object-center"
      />

      {/* Animated Text */}
      <div
        ref={overlayTextRef}
        className="fixed top-1/2 right-10 -translate-y-1/2 opacity-0 translate-x-10  text-white w-1/3 z-50"
      >
        <h2 className="text-9xl head font-bold ">{clickedItem.name}</h2>
        <p className="text-md  mt-0">This image zoomed in and text appeared beautifully using GSAP!</p>
      </div>

      {/* Close Button */}
      <button
        ref={closeBtnRef}
        onClick={handleClose}
        className="fixed top-10 head right-10 opacity-0 z-50 text-xl  text-white px-4 py-2 rounded"
      >
        Close
      </button>
    </div>
  );
}
