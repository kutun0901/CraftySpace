import React from "react";
import './Footer.css'

function Footer() {
    return (
            <div className="footer-container">
                <div className="contact me">
                    <h4>Contact me:</h4>
                    <p>Email: tuan.tq2433@gmail.com</p>
                </div>
                <span className="project-repo">
                    <a href="https://github.com/kutun0901/CraftySpace" target="_blank" rel="noreferrer">
                        <i className="contact_us_github_icon fa-brands fa-github" />
                    </a>
                    <a href="https://www.linkedin.com/in/tuan-tran-quoc-163853117/" target="_blank" rel="noreferrer">
                        <i className="contact_us_linkedin_icon fa-brands fa-linkedin" />
                    </a>
                </span>
            </div>
    )
}

export default Footer;
