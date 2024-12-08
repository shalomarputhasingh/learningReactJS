import { useState } from "react";
import "./App.css";
import Message from "./components/AlertMessage";
function App() {
  const [alertMessageVisibility, setAlertVisibility] = useState(false);
  return (
    <>
      <div>
        {alertMessageVisibility&&<Message onClose={()=>setAlertVisibility(false)}>My alert message</Message>}
        <button
          className="btn btn-primary"
          onClick={() =>
            alertMessageVisibility === false
              && setAlertVisibility(true)
          }
        >
          Click Me
        </button>
      </div>
    </>
  );
}

export default App;
