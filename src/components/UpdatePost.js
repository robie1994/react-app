import { useState } from 'react'
import Modal from 'react-modal'
import $ from 'jquery';
import { CloseButton } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';

Modal.setAppElement('#root')
const UpdatePost = (props) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  let [title, setTitle] = useState('')
  let [body, setBody] = useState('')

  function updatePost() {
    title = !title ? $('#title').val() : title;
    body = !body ? $('#body').val() : body;

    let item = { title, body }
    fetch(`http://localhost:5007/posts/${props.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    }).then((result) => {
      result.json().then((resp) => {
        setModalIsOpen(false)
        window.location.reload(true)
      })
    })
  }


  return (
    <div>

      <FaUserEdit onClick={() => setModalIsOpen(true)} size={20} style={{ color: 'black' }} />
      <form className="add-form">
        <Modal className='modal-window' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
          <CloseButton onClick={() => setModalIsOpen(false)} />
          <h2>Update Post</h2>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td width="150px">Title: </td>
                <td><input type="textbox" placeholder="Title" id="title" defaultValue={props.title} onChange={(e) => { setTitle(e.target.value) }} /></td>
              </tr>
              <tr>
                <td>Body/Content: </td>
                <td><textarea placeholder="Body/Content" id="body" defaultValue={props.body} onChange={(e) => setBody(e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-block" onClick={updatePost}>Update Post</button>
        </Modal>
      </form>
    </div>
  )
}

export default UpdatePost