import { useState } from "react";
import validator from "validator";

const labelStyles = "block text-gray-700 font-medium mb-2";
const inputStyles = "w-full px-3 py-2 border border-gray-300 rounded-md";
const buttonStyles =
  "w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600";

const defaultSignupInput = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Sandbox = () => {
  const [signupInput, setSignupInput] = useState(defaultSignupInput);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignupInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!validator.isEmail(signupInput.email)) {
      return setError("Invalid email!");
    }
    if (!validator.isLength(signupInput.password, { min: 5 })) {
      return setError("Password must be at least 5 characters long!");
    }
    if (signupInput.password !== signupInput.confirmPassword) {
      return setError("Passwords do not match!");
    }
    setError("");
    setSignupInput(defaultSignupInput);
  };

  return (
    <div className='container max-w-md p-6 mx-auto mt-10 bg-white rounded-lg shadow-md'>
      <form className='space-y-4'>
        {/* email input */}
        <div className='mb-3'>
          <label htmlFor='email' className={labelStyles}>
            Email address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={signupInput.email}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>
        {/* password input */}
        <div className='mb-3'>
          <label htmlFor='password' className={labelStyles}>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            value={signupInput.password}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>
        {/* confirm password input */}
        <div className='mb-3'>
          <label htmlFor='confirmPassword' className={labelStyles}>
            Confirm password
          </label>
          <input
            type='password'
            id='confirmPassword'
            name='confirmPassword'
            value={signupInput.confirmPassword}
            onChange={handleChange}
            className={inputStyles}
          />
        </div>
        {/* error message */}
        {error && <p className='text-sm text-red-500'>{error}</p>}
        <button type='button' onClick={handleSubmit} className={buttonStyles}>
          Submit button
        </button>
      </form>
    </div>
  );
};
export default Sandbox;
