import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Fejléc</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem culpa
        explicabo dicta omnis maiores aspernatur, iste eligendi, fugiat
        asperiores tenetur voluptatum reprehenderit non exercitationem? Nemo aut
        quis numquam non eos.
        {count}
      </p>
    </>
  );
}

export default App;
