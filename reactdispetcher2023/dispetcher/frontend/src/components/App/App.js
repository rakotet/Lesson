
function App() {
  function handlerClick() {
    alert('1111')
  }

  return (
    <>
      <h1>Hello1</h1>
      <button onClick={handlerClick}>Click1</button>
    </>
  );
}

export default App;
