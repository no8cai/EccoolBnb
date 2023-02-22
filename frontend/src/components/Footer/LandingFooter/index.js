import "./LandingFooter.css"

const LandingFooter=()=>{
    return (
        <div className="lfts-section">
          <div className="lf-leftsec">
            <span className="lfooters-subcontext">2023 EccoolBnb</span>
            <span>·</span>
            <span>
            <a href='https://github.com/no8cai' className="lfooters-links-subcontext" target="_blank">
                <i className="fa-brands fa-github"/> Github
                </a>
            </span>
            <span>·</span>
            <span>
                <a href='https://www.linkedin.com/in/eric-chai-b5b9b337/' className="lfooters-links-subcontext" target="_blank">
                <i className="fa-brands fa-linkedin"/> Linkedin
                </a>
            </span>
            <span>·</span>
            <span>
                <a href='https://angel.co/u/eric-chai-2' className="lfooters-links-subcontext" target="_blank">
                <i className="fa-brands fa-angellist"/> Wellfound
                </a>
            </span>
            <span>·</span>
            <span>
            <a href='https://github.com/no8cai/EccoolBnb/blob/main/README.md' className="lfooters-links-subcontext" target="_blank">
                Readme
                </a>
            </span>
            <span>·</span>
            <span>
               <a href='https://github.com/no8cai/EccoolBnb/wiki' className="lfooters-links-subcontext" target="_blank">
                Webwiki
                </a>
            </span>
          </div>  
          
          <div className="lf-rightsec">
            <span><i className="fa-solid fa-globe"/>English</span>
            <span className="lfooters-subcontext">$USD</span>
            <span>
            <a href='https://www.airbnb.com//' className="lfooters-links-subcontext" target="_blank">
                Offical AirBnb website
                </a>
            </span>
          </div>
        </div>
    )
}

export default LandingFooter