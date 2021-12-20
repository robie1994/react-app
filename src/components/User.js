import { confirm } from "react-confirm-box";
import Update from './Update';
import { FaRegTrashAlt } from 'react-icons/fa';

const User = (props) => {
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }

  const onDelete = async () => {
    const result = await confirm("Are you sure you want to delete?", options);
    if (result) {
      props.onDelete(props.user.id)
      return;
    }
    return;
  };
  return (

    <div className="user">
     
      <table className="table table-striped">
        <tbody>
          <tr>
            <td>{props.user.name}</td>
            <td>{props.user.email}</td>
            <td>{props.user.city}</td>
            <td>{props.user.gender}</td>
            <td>{props.user.username}</td>
            <td>
            <FaRegTrashAlt onClick={() => onDelete()} size={20} style={{color: 'red'} }/>
            <Update 
            name={props.user.name} 
            email = {props.user.email} 
            city= {props.user.city}
            gender = {props.user.gender}
            username = {props.user.username}
            id = {props.user.id}
            
            />
            
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default User