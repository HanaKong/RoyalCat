import Header from "./components/Header";
import Introduction from "./components/Introduction";
import Story from "./components/Story";
import Footer from "./components/Footer";
import GameDownload from "./components/GameDownload";

import "./App.css";
import { useRef } from "react";
import { Route, Router, Routes } from "react-router-dom";
import Signup from "./components/Signup";

function App() {
  const scrollRefs = {
    intro: useRef(null),
    story: useRef(null),
  };
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header scrollRefs={scrollRefs} />
            <GameDownload />
            <Introduction ref={scrollRefs.intro} />
            <Story ref={scrollRefs.story} />
            <Footer />
          </>
        }
      />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
