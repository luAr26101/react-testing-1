import { useState, type FormEvent } from "react";
import type { Review } from "./Sandbox";
type FormProps = {
  onSubmit: (review: Review) => void;
};

function Form({ onSubmit }: FormProps) {
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [text, setText] = useState("");
  const [textError, setTextError] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (text.length >= 10) {
      const newReview = { email, rating, text };
      onSubmit(newReview);
      setEmail("");
      setRating("");
      setText("");
      setTextError("");
    } else {
      setTextError("Review must be at least 10 characters long.");
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit} className='mb-8 space-y-4'>
      <div>
        <label htmlFor='email' className='block mb-2'>
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full p-2 border rounded'
          required
        />
      </div>
      <div>
        <label htmlFor='rating' className='block mb-2'>
          Rating
        </label>
        <select
          name='rating'
          id='rating'
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className='w-full p-2 border rounded'
          required
        >
          <option value=''>Select rating</option>
          {[5, 4, 3, 2, 1].map((num) => {
            return (
              <option key={num} value={num}>
                {num} star{num !== 1 ? "s" : ""}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <label htmlFor='text' className='block mb-2'>
          Your review
        </label>
        <textarea
          name='text'
          id='text'
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='w-full p-2 border rounded'
          required
          rows={4}
        />
        {textError && (
          <p className='mt-1 mb-2 text-sm text-red-500'>{textError}</p>
        )}
        <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}

export default Form;
