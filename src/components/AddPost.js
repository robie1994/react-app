import { useState } from 'react'
import Modal from 'react-modal'
import { CloseButton } from 'react-bootstrap';
import { FaPen } from 'react-icons/fa';


Modal.setAppElement('#root')

const AddPost = (props) => {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        if (!title || !body) {
            alert('Please add a title and a body')
            return
        }
        props.onPost({ title, body })
        setTitle('')
        setBody('')
        alert('You have shared a post! ')
        setModalIsOpen(false)
        
    }


    return (
        
        <div>
                
            <div>
            <button className="btn-add" onClick={() => setModalIsOpen(true)}>Share a post</button> <FaPen size={30} />
            </div>
            <form className="add-form">
                <Modal className='modal-window' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <CloseButton onClick={() => setModalIsOpen(false)}/>
                    <h2>Share something ...</h2>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td width="150px">Title: </td>
                                <td><input type="textbox" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Body/Content: </td>
                                <td><textarea placeholder="Body/Content" value={body} onChange={(e) => setBody(e.target.value)} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-block"  onClick={onSubmit}>Share this post</button>
                </Modal>
            </form>
        </div>
    )
}

export default AddPost