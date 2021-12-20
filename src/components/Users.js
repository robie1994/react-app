import User from "./User"
const Users = (props) => {
    return (
        <>
        {props.users.map((user) => (
        <User key={user.id} user={user} onDelete={props.onDelete} />
        ))}
        
        
    </>
    )
}

export default Users