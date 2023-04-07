import { Link } from "react-router-dom"

const Feed =()=>{
    return(
        <div className="friends">
        <Link to="/">
                <h1>Home</h1>
            </Link>
        <h2>Add Friend</h2>
        <h1>Squad Goals</h1>
        {/* todo - add search drop down of all registered users
        todo - display each users goals besides the one that is logged in */}
        </div>
    )
}

export default Feed