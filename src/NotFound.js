import { Link } from "react-router-dom"
import Button from 'react-bootstrap/Button';

const NotFound = () => {
    return (
        <div className="not-found">
            <br/>
            <h2>Sorry!</h2>
            <p>This page was not found.</p>
            <Link to="/">
                <Button>Go Home</Button>
            </Link>
        </div>
    );
}

export default NotFound;