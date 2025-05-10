import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ViewPost from "./pages/ViewPost";
import WriteNew from "./pages/WriteNew";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<ViewPost />} />
        <Route path="/new" element={<WriteNew />} />
      </Routes>
    </Router>
  );
}

export default App;
