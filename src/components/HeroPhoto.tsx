import React, { useEffect, useRef, useState } from "react";
import HeroImg from "../assets/images/HeroImage.svg";
import { gsap, Power4 } from "gsap";

const aboutTextFirst =
  "I am Dawid, 19, from Silesia Poland. I am an aspiring Front-End Developer.";
const aboutTextSecond =
  "I started my path to becoming a programmer in May 2020 in Java, but after two months I migrated to Front-End.";

const HeroPhoto: React.FC = () => {
  const [showAbout, setshowAbout] = useState<boolean>(false);
  const [aboutText, setAboutText] = useState<string>("");
  let imageRef = useRef<HTMLHeadingElement | null>(null);
  let dialogue = useRef<HTMLHeadingElement | null>(null);
  let circle1 = useRef<HTMLHeadingElement | null>(null);
  let circle2 = useRef<HTMLHeadingElement | null>(null);
  let btnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (imageRef.current) {
      gsap.from(imageRef.current.firstElementChild, {
        duration: 3,
        opacity: 0,
        ease: Power4.easeIn,
        transformOrigin: "top left",
      });
      gsap.from(imageRef.current.lastElementChild, {
        duration: 1,
        delay: 2,
        opacity: 0,
        ease: Power4.easeOut,
      });
    }
  }, []);

  useEffect(() => {
    let interval: any;
    if (showAbout) {
      let i = 0;
      let first = true;
      interval = setInterval(() => {
        i++;
        if (first) {
          const text = aboutTextFirst.substring(0, i);
          setAboutText(text);
          if (i === aboutTextFirst.length + 17) {
            i = 0;
            setAboutText("");
            first = false;
          }
        } else {
          const text = aboutTextSecond.substring(0, i);
          setAboutText(text);
          if (i === aboutTextSecond.length + 5) {
            clearInterval(interval);
          }
        }
      }, 60);
    }
    return () => clearInterval(interval);
  }, [showAbout]);

  const clickHandler = () => {
    gsap.to(dialogue.current, {
      visibility: "visible",
    });
    if (dialogue.current) {
      gsap.to(circle2.current, {
        opacity: 1,
        duration: 0.5,
        scale: 1,
      });
      gsap.to(circle1.current, {
        opacity: 1,
        duration: 0.5,
        delay: 0.5,
        scale: 1,
      });
      gsap
        .to(dialogue.current.firstElementChild, {
          opacity: 1,
          duration: 0.5,
          delay: 1,
        })
        .then(() => {
          setshowAbout(true);
        });
      gsap.to(btnRef.current, {
        opacity: 1,
        duration: 0.5,
        delay: 2.5,
      });
    }
  };

  const btnClickHandler = () => {
    if (dialogue.current) {
      gsap.to(circle2.current, {
        opacity: 0,
        duration: 0.5,
      });
      gsap.to(circle1.current, {
        opacity: 0,
        duration: 0.5,
      });
      gsap.to(btnRef.current, {
        opacity: 0,
        duration: 0.5,
      });
      gsap
        .to(dialogue.current.firstElementChild, {
          opacity: 0,
          duration: 0.5,
        })
        .then(() => {
          setshowAbout(false);
          setAboutText("");
        });
    }

    gsap.to(dialogue.current, {
      visibility: "hidden",
      delay: 0.5,
    });
  };

  return (
    <div ref={imageRef} className="hero-imageBox">
      <img
        loading="lazy"
        className="hero-image"
        src={HeroImg}
        alt="profilImage"
      />
      <div ref={dialogue} className="about">
        <div className="about-context">
          {aboutText}
          <button
            ref={btnRef}
            onClick={btnClickHandler}
            className="about-context-btn"
          >
            ok
          </button>
        </div>
        <div ref={circle1} className="circle1"></div>
        <div ref={circle2} className="circle2"></div>
      </div>
      <button onClick={clickHandler} className="hero-image-btn">
        Tell me Something
      </button>
    </div>
  );
};

export default HeroPhoto;