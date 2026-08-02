import type { Review } from "./Sandbox";

type ListProps = {
  reviews: Review[];
};

function List({ reviews }: ListProps) {
  return (
    <div className='mb-8'>
      <h2 className='mb-4 text-xl font-bold'>Reviews</h2>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <>
          {reviews.map((review, index) => {
            const { email, rating, text } = review;
            return (
              <article key={index} className='p-4 mb-4 border rounded'>
                <div className='font-bold'>{email}</div>
                <div className='text-yellow-500'>
                  {"⭐".repeat(Number(rating))}
                </div>
                <p className='mt-2'>{text}</p>
              </article>
            );
          })}
        </>
      )}
    </div>
  );
}

export default List;
