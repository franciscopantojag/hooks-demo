import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

interface Props {
  images: string[];
}

const IMAGE_CHANGE_MS = 5000;

const Gallery: React.FC<Props> = ({ images }) => {
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const focusPrev = useCallback(() => {
    if (!prevButtonRef.current) return;
    prevButtonRef.current.focus();
  }, []);
  const maxIdx = useMemo(() => images.length - 1, [images.length]);
  const [imageIdx, setImageIdx] = useState(0);
  const onNextImage = useCallback(
    () =>
      setImageIdx((prev) => {
        const nextIdx = prev + 1;
        if (nextIdx > maxIdx) return 0;
        return nextIdx;
      }),
    [maxIdx]
  );
  const onPrevImage = useCallback(
    () =>
      setImageIdx((prev) => {
        const prevIdx = prev - 1;
        if (prevIdx < 0) return maxIdx;
        return prevIdx;
      }),
    [maxIdx]
  );

  const imageUrl = useMemo(() => images[imageIdx], [imageIdx, images]);

  useEffect(() => {
    const t = setInterval(onNextImage, IMAGE_CHANGE_MS);
    return () => clearInterval(t);
  }, [onNextImage]);
  return (
    <div className="w-[800px] h-[500px] flex flex-col bg-white p-6">
      <div className="h-[350px] flex justify-center">
        <img onClick={focusPrev} className="h-full block" src={imageUrl} />
      </div>
      <div className="p-3 flex-grow flex justify-between items-center">
        <button
          ref={prevButtonRef}
          onClick={onPrevImage}
          className="bg-slate-500 text-white rounded-md h-[40px] w-[100px] flex justify-center items-center gap-2 focus:outline-none focus:ring-2 focus:ring-zinc-800"
        >
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span>Prev</span>
        </button>
        <button
          onClick={onNextImage}
          className="bg-slate-500 text-white rounded-md h-[40px] w-[100px] flex justify-center items-center gap-2"
        >
          <span>Next</span>
          <svg
            className="w-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Gallery;
