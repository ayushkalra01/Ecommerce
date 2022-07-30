import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white"
      style={{ backgroundColor: "rgb(0, 21, 41)" }}
    >
      <div className="row">&nbsp;</div>
      <div className="container">
        <div className="row">
          <div className="col-md-3 offset-md-1">
            <ul>
              <li>
                <b>Get to Know Us</b>
              </li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>About us</li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>Careers</li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>Electro</li>
            </ul>
          </div>
          <div className="col-md-3 offset-md-1">
            <ul>
              <li>
                <b>Connect With Us</b>
              </li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>
                <i className="fab fa-facebook-f m-1"></i> Facebook
              </li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>
                <i className="fab fa-twitter m-1"></i> Twitter
              </li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>
                <i className="fab fa-instagram m-1"></i> Instagram
              </li>
            </ul>
          </div>
          <div className="col-md-3 offset-md-1">
            <ul>
              <li>
                <b>Let Us Help You</b>
              </li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>Help</li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>
                100% purchase protection
              </li>
              <li style={{ color: "hsl(210, 22%, 49%)" }}>Return</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center mt-3">
        © {new Date().getFullYear()}
        Copyright: <span style={{ color: "rgb(64, 169, 255)" }}> Electro</span>
      </div>
    </footer>
  );
};

export default Footer;
