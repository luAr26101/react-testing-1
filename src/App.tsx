import Sandbox from "./tutorial/04-user-interactions/Sandbox";

function App() {
  return (
    <>
      <div className='p-8'>
        <h1 className='text-2xl font-bold'>React Testing Library!</h1>
        <p className='mt-4 text-gray-700'>
          React Testing Library and Vitest work together to provide a robust
          testing environment.
        </p>
      </div>
      <Sandbox />
    </>
  );
}
export default App;
