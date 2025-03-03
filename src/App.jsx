import React from 'react';
import Navigation from "./components/Navigation";
import Greetings from "./containers/Greetings";
import Skills from "./containers/Skills";
import Proficiency from "./containers/Proficiency";
import Education from "./containers/Education";
import Experience from "./containers/Experience";
import Projects from "./containers/Projects";
import GithubProfile from "./containers/GithubProfile";
import Feedbacks from "./containers/Feedbacks";

// Import CSS - Replaced Argon Design with custom Bootstrap
import "./assets/css/custom-bootstrap.css";
import "./assets/css/browser-fixes.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Greetings />
      <Skills />
      <Proficiency />
      <Education />
      <Experience />
      <Feedbacks />
      <Projects />
      <GithubProfile />
    </div>
  );
}

export default App;
