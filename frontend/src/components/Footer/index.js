import "./Footer.css"

const Footer=()=>{
    return (
        <div className="fts-section">
            
            <div className="fts-context">
               <div className="footers-links-labels">
                About me
                </div>
                <a href='https://github.com/no8cai' className="footers-links-subcontext" target="_blank">
                <i className="fa-brands fa-github"/> Github
                </a>
                <a href='https://www.linkedin.com/in/eric-chai-b5b9b337/' className="footers-links-subcontext" target="_blank">
                <i className="fa-brands fa-linkedin"/> Linkedin
                </a>
                <a href='https://angel.co/u/eric-chai-2' className="footers-links-subcontext" target="_blank">
                <i className="fa-brands fa-angellist"/> Wellfound
                </a>
            </div>
            <div className="fts-context">
                <div className="footers-links-labels">
                Support
                </div>
                <a href='https://github.com/no8cai/EccoolBnb/blob/main/README.md' className="footers-links-subcontext" target="_blank">
                Website readMe
                </a>
                <a href='https://github.com/no8cai/EccoolBnb/wiki' className="footers-links-subcontext" target="_blank">
                Website wiki
                </a>
            </div>
            <div className="fts-context">
                <div className="footers-links-labels" >
                Technology
                </div>
                <a href='https://developer.mozilla.org/en-US/docs/Web/JavaScript' className="footers-links-subcontext" target="_blank">
                JavaScript
                </a>
                <a href='https://expressjs.com/' className="footers-links-subcontext" target="_blank">
                Express
                </a>
                <a href='https://sequelize.org/' className="footers-links-subcontext" target="_blank">
                Sequelize
                </a>
                <a href='https://reactjs.org/' className="footers-links-subcontext" target="_blank">
                ReactJS
                </a>
                <a href='https://www.postgresql.org/' className="footers-links-subcontext" target="_blank">
                PostgreSql
                </a>
            </div>

            <div className="fts-context">
                <div className="footers-links-labels" >
                Learn about AirBnb
                </div>
                <a href='https://www.airbnb.com//' className="footers-links-subcontext" target="_blank">
                Offical AirBnb website
                </a>
                </div>
        </div>
    )
}

export default Footer