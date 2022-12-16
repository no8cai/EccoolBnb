import "../Errors.css"
import { useHistory } from "react-router-dom";

const ErrornotFind=()=>{
    
    const history=useHistory();

    const onClickevent=()=>{
        history.push("./")
    }

    return(
        <div className="error404-landing">
            <div className="error404-left">
            <div className="error404-oops">Oopes!!</div>
            <div className="error404-info">We can't seem to find the page you're looking for.</div>
            <div className="error404-code">Error code: 404</div>
            <div className="error404-help">Here are some helpful links instead:</div>
            <div className="error404-link" onClick={onClickevent} >Home</div>
            </div>
            <div></div>
        </div>
    )
}

export default ErrornotFind;