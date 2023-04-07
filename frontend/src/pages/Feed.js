import { Link } from "react-router-dom"

const Feed =()=>{
    return(
        <div className="friends">
        <Link to="/">
                <h1>Home</h1>
            </Link>
        <h1>Here is feed for friends</h1>
        <h2>Add Friend</h2>
        </div>
    )
}

export default Feed