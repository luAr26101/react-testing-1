import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
const Sandbox = () => {
  const [count, setCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount((prevCount) => prevCount - 1);
  };

  const handleToggleLike = () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
  };

  return (
    <div className='p-8 text-center'>
      <h2 className='mb-4 text-2xl font-bold'>Count: {count}</h2>
      <button
        onClick={handleIncrease}
        className='px-4 py-2 mr-2 text-white bg-blue-500 rounded'
      >
        Increase
      </button>
      <button
        onClick={handleDecrease}
        className='px-4 py-2 text-white bg-red-500 rounded'
      >
        Decrease
      </button>
      <div>
        {isLiked ? (
          <button
            onClick={handleToggleLike}
            className='block mx-auto mt-16 text-2xl text-red-500'
            aria-label='like button'
          >
            <FaHeart />
          </button>
        ) : (
          <button
            onClick={handleToggleLike}
            className='block mx-auto mt-16 text-2xl text-red-500'
            aria-label='dislike button'
          >
            <FaRegHeart />
          </button>
        )}
      </div>
    </div>
  );
};
export default Sandbox;
