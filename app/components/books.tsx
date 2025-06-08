import React, { useEffect, useRef, useState } from "react";

interface BookViewerProps {
  color: string;
  pages: React.ReactNode[];
  cover?: string; // can be a background image URL or color
  coverTitle: string;
  coverSubtitle: string;
}


const BookViewer: React.FC<BookViewerProps> = ({
  color,
  pages,
  cover,
  coverTitle,
  coverSubtitle,
}) => {
  const pageRefs = useRef<HTMLDivElement[]>([]);
  const [pageIndex, setPageIndex] = useState(0);

  // Initialize z-index
  useEffect(() => {
    pageRefs.current.forEach((el, i) => {
      if (el) el.style.zIndex = `${pages.length + 2 - i}`;
    });
  }, [pages.length]);

  const handlePageClick = (index: number) => {
    const el = pageRefs.current[index];
    if (!el) return;

    const turned = el.classList.contains("turned");
    const newPageIndex = turned ? pageIndex - 1 : pageIndex + 1;

    if (turned) {
      if (pageIndex > 0 && pageRefs.current[pageIndex - 1]) {
        pageRefs.current[pageIndex - 1].style.zIndex = `${pages.length - pageIndex + 2}`;
      }
    } else {
      if (pageIndex > 0 && pageRefs.current[pageIndex - 1]) {
        pageRefs.current[pageIndex - 1].style.zIndex = `${pageIndex - (pages.length - 1)}`;
      }
    }

    el.classList.toggle("turned");
    setPageIndex(newPageIndex);
  };

  return (
    <div className="book-ult">
      {/* Cover Page */}
      <div
        className="book-page"
        id="cover"
        ref={(el) => (pageRefs.current[0] = el!)}
        onClick={() => handlePageClick(0)}
      >
        <div
          className="front"
          style={
            cover
              ? { backgroundImage: `url(${cover})`, backgroundSize: "cover" }
              : { background: color }
          }
        >
          <header>
            <h1>{coverTitle}</h1>
            <h6>{coverSubtitle}</h6>
          </header>
        </div>
        <div style={{ background: color }} className="back"></div>
      </div>

      {/* Dynamic Pages */}
      {pages.map((_, i, a) => (i % 2 === 0 ? [a[i], a[i + 1]] : null))
        .filter(Boolean)
        .map((content, index) => (
        <div
          className="book-page"
          key={index + 1}
          ref={(el) => (pageRefs.current[index + 1] = el!)}
          onClick={() => handlePageClick(index + 1)}
        >
          <div className="front">
            <div className="pagenumber">{index * 2 + 1}</div>
            {content![0]}
          </div>
          <div className="back">
            <div className="pagenumber">{index * 2 + 2}</div>
            {content![1]}
          </div>
        </div>
      ))}

      {/* Back Cover */}
      <div
        className="book-page"
        id="back"
      >
        <div style={{ background: color }} className="front"></div>
        <div style={{ background: color }} className="back"></div>
      </div>
    </div>
  );
};

export default BookViewer;