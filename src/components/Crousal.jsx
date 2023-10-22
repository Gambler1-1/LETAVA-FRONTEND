import React, { useEffect, useState } from "react";
import { MDBCardImage, MDBCarousel, MDBCarouselItem } from "mdb-react-ui-kit";
import Navbarr from "./Navbarr";

const imageArr = [
  { src: "https://mdbootstrap.com/img/new/slides/041.jpg", id: 1 },
  { src: "https://mdbootstrap.com/img/new/slides/042.jpg", id: 2 },
  { src: "https://mdbootstrap.com/img/new/slides/043.jpg", id: 3 },

];

export default function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Navbarr />
      <div
        className="carousel-container"
        style={{ width: `${windowWidth}px`, height: "100px" }}
      >
        <MDBCarousel showControls interval={2500} wrap>
          {imageArr.map((image) => {
            return (
              <MDBCarouselItem
                className="w-100 h-100"
                itemId={image.id}
                src={image.src}
                alt="..."
              />
            );
          })}
        </MDBCarousel>
      </div>
    </>
  );
}
