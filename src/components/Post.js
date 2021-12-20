import { confirm } from "react-confirm-box";
import UpdatePost from "./UpdatePost";
import { ToastContainer, Toast } from 'react-bootstrap';
import { FaRegTrashAlt } from 'react-icons/fa';
import { useState } from 'react'



const headingStyle = {
  color: 'black',
  backgroundColor: 'steelblue',
}
const Post = (props) => {
  const options = {
    labels: {
      confirmable: "Confirm",
      cancellable: "Cancel"
    }
  }
  const [show, setShow] = useState(true);
  const toggleShow = () => setShow(!show);

  const onDelete = async () => {
    const result = await confirm("Are you sure you want to delete this post?", options);
    if (result) {
      props.onDelete(props.post.id)
      return;
    }
    return;
  };
  return (
   
    <div className="post">
      <ToastContainer>
        <Toast show={show} onClose={toggleShow}>
          <Toast.Header style={headingStyle}>
            <strong className="me-auto">{props.post.title}</strong>
            <small>
              <UpdatePost 
                title={props.post.title} 
                body = {props.post.body} 
                id = {props.post.id}
                />
                </small>
                <small>&nbsp;</small>
                <small><FaRegTrashAlt onClick={() => onDelete()} size={20} style={{color: 'red'} }/></small>
          </Toast.Header>
          <Toast.Body>{props.post.body}</Toast.Body>
        </Toast>
      </ToastContainer>
      &nbsp;
    </div>
  )
}

export default Post
