import { useState } from 'react'
import Modal from 'react-modal'
import { CloseButton } from 'react-bootstrap';
import { FaUserPlus } from 'react-icons/fa';
Modal.setAppElement('#root')

function AddUser(props) {
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [gender, setGender] = useState('')
    const [username, setUsername] = useState('')
    const onSubmit = (e) => {
        e.preventDefault()

        if (!name) {
            alert('Please add a name')
            return
        }
        props.onAdd({ name, email, city, gender, username })
        setName('')
        setEmail('')
        setCity('')
        setGender('')
        setUsername('')
        alert('User has been added')
        setModalIsOpen(false)
        
    }

    return (
        
        <div>
            <div>
            <button className="btn" onClick={() => setModalIsOpen(true)} >Create User</button><FaUserPlus size={30} style={{color: 'steelblue'}}/>
            </div>
            <form className="add-form">
                <Modal className='modal-window' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <CloseButton onClick={() => setModalIsOpen(false)}/>
                    <h2>Create User</h2>
                    <table className="table table-striped">
                        <tbody>
                            <tr>
                                <td width="150px">Name: </td>
                                <td><input type="textbox" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Email: </td>
                                <td><input type="textbox" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>City: </td>
                                <td><input type="textbox" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Gender: </td>
                                <td><input type="textbox" placeholder="Gender" value={gender} onChange={(e) => setGender(e.target.value)} /></td>
                            </tr>
                            <tr>
                                <td>Username: </td>
                                <td><input type="textbox" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <button className="btn btn-block"  onClick={onSubmit}>Save User</button>
                </Modal>
            </form>
        </div>
    )
}

export default AddUser