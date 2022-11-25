import "../styles/App.css";
import Header from "./Header";
import CreateLink from "./CreateLink";
import LinkList from "./LinkList";
import Login from "./Login";
import Search from "./Search";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="w-3/4 mx-auto ">
          <Header />
          <div className="p-2 bg-gray-50 h-screen">
            <Routes>
              <Route path="/" element={<Navigate replace to="/new/1" />} />
              <Route path="/" element={<LinkList />} />
              <Route path="/create" element={<CreateLink />} />
              <Route path="/login" element={<Login />} />
              <Route path="/search" element={<Search />} />
              <Route path="/top" element={<LinkList />} />
              <Route path="/new/:page" element={<LinkList />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
