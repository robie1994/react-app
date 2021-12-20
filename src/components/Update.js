import { useState, useEffect } from 'react'
import Modal from 'react-modal'
import $ from 'jquery';
import { CloseButton } from 'react-bootstrap';
import { FaUserEdit } from 'react-icons/fa';

Modal.setAppElement('#root')

function Update(props) {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [city, setCity] = useState('')
  let [gender, setGender] = useState('')
  let [username, setUsername] = useState('')

  const [users, setUsers] = useState([])
  
  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUsers(usersFromServer)
    }
    getUsers()
  }, [])

  // Fetch Users
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5007/users')
    const data = await res.json()

    return data
  }



  function updateUser() {
    name = !name ? $('#name').val() : name;
    email = !email ? $('#email').val() : email;
    city = !city ? $('#city').val() : city;
    gender = !gender ? $('#gender').val() : gender;
    username = !username ? $('#username').val() : username;

    let item = { name, email, city, gender, username }
    fetch(`http://localhost:5007/users/${props.id}`, {
      method: 'PUT',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify(item)
    })
      setModalIsOpen(false)
      window.location.reload(true)
  }


  return (
    <div>

      <FaUserEdit onClick={() => setModalIsOpen(true)} size={20} style={{color: 'steelblue'}}/>
      <form className="add-form">
        <Modal className='modal-window' isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <CloseButton onClick={() => setModalIsOpen(false)}/>
          <h2>Update User</h2>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td width="150px">Name: </td>
                <td><input type="textbox" placeholder="Name" id="name" defaultValue={props.name} onChange={(e) => { setName(e.target.value) }} /></td>
              </tr>
              <tr>
                <td>Email: </td>
                <td><input type="textbox" placeholder="Email" id="email" defaultValue={props.email} onChange={(e) => setEmail(e.target.value)} /></td>
              </tr>
              <tr>
                <td>City: </td>
                <td><input type="textbox" placeholder="City" id="city" defaultValue={props.city} onChange={(e) => setCity(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Gender: </td>
                <td><input type="textbox" placeholder="Gender" id="gender" defaultValue={props.gender} onChange={(e) => setGender(e.target.value)} /></td>
              </tr>
              <tr>
                <td>Username: </td>
                <td><input type="textbox" placeholder="Username" id="username" defaultValue={props.username} onChange={(e) => setUsername(e.target.value)} /></td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-block" onClick={updateUser}>Update User</button>
        </Modal>
      </form>
    </div>
  )
}
export default Update