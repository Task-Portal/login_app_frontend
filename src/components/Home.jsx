import React from "react";
import Header from "./Header";
import "../styles/home.css";
import backImg1 from "../img/1.png";
import { useNavigate } from "react-router-dom";
function Home(props) {
  const navigate = useNavigate();
  const handleBtn = (param) => {
    navigate(`/${param}`);
  };
  return (
    <div className="container-home">
      <Header isHidden={false} />
      <main
        className="container-main"
        style={{
          backgroundImage: ` linear-gradient(rgba(23, 34, 52, 0.6), rgba(23, 34, 52, 0.6)),  url(${backImg1})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat,",
          backgroundPosition: "center",
        }}
      >
        <div className="sub-container">
          <section className="container-text">
            <h1>The chemical negatively charged</h1>
            <p className="desc">
              Numerous calculations predict, and experiments confirm, that the
              force field reflects the beam, while the mass defect is not
              formed. The chemical compound is negatively charged. Twhile the
              mass defect is
            </p>
          </section>
          <button
            className="btn-get-started"
            onClick={() => handleBtn("login")}
          >
            Get Started
          </button>
        </div>
      </main>
    </div>
  );
}

export default Home;
