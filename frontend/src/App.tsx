import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import NotesList from "./components/NotesList";

function App() {
  return (
    <div>
      {" "}
      <Header></Header>
      <NotesList></NotesList>
      <Footer></Footer>
    </div>
  );
}

export default App;
