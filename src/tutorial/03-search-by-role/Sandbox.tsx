import { useEffect, useState } from "react";
const Sandbox = () => {
  const [showAsyncButton, setShowAsyncButton] = useState(false);
  const [showError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAsyncButton(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      <nav>
        <a href='/'>Home</a>
        <a href='/about'>About</a>
      </nav>
      {/* Headings */}
      <h1>Main heading</h1>
      <h2>Sub heading</h2>
      <img src='example.jpg' alt='example' />
      {/* Regular buttons*/}
      <button type='button'>click me</button>
      <button type='button'>submit</button>
      <button type='button'>cancel</button>
      {/* conditional error to demostrate queryByRole */}
      {showError && <button type='button'>error</button>}
      {/* async button to demostrate findByRole */}
      {showAsyncButton && <button type='button'>async button</button>}
    </div>
  );
};
export default Sandbox;
