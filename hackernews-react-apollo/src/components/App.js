import "../styles/App.css";
import Header from "./Header";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Header />
          <div className="p-2 bg-gray-50">
            <Routes>
              <Route path="/" element={<LinkList />} />
              <Route path="/create" element={<CreateLink />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
