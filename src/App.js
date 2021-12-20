import Header from "./components/Header";
import Users from "./components/Users";
import { useState, useEffect } from 'react'
import AddUser from "./components/AddUser"
import SearchUser from "./components/SearchUser";
import Posts from "./components/Posts";
import AddPost from "./components/AddPost";
import { Navbar, Container, Nav } from 'react-bootstrap';

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState("")
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    const getUsers = async () => {
      const usersFromServer = await fetchUsers()
      setUsers(usersFromServer)
    }

    const getPosts = async () => {
      const postsFromServer = await fetchPosts()
      setPosts(postsFromServer)
    }

    getUsers()
    getPosts()
  }, [])

  // Fetch Users
  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5007/users')
    const data = await res.json()

    return data
  }
  // Fetch Posts
  const fetchPosts = async () => {
    const res = await fetch('http://localhost:5007/posts')
    const data = await res.json()

    return data
  }

  // Add User
  const addUser = async (user) => {

    const res = await fetch('http://localhost:5007/users', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const data = await res.json()
    setUsers([...users, data])
  }

  // Add Post
  const addPost = async (post) => {
    const res = await fetch('http://localhost:5007/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    const data = await res.json()
    setPosts([...posts, data])
  }

  // Delete User
  const deleteUser = async (id) => {
    await fetch(`http://localhost:5007/users/${id}`, {
      method: 'DELETE'
    })
    setUsers(users.filter((user) => user.id !== id))
  }

  // Delete Post
  const deletePost = async (id) => {
    await fetch(`http://localhost:5007/posts/${id}`, {
      method: 'DELETE'
    })
    setPosts(posts.filter((post) => post.id !== id))
  }

  //Search Handler
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm)
    if (searchTerm !== "") {
      const newUserList = users.filter((user) => {
        return Object.values(user).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
      })
      setSearchResults(newUserList)
    }
    else {
      setSearchResults(users);
    }
  };

  return (
    <div className="body">
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home"><AddUser onAdd={addUser} /></Navbar.Brand>
            <Nav className="me-auto">
              <Nav ><SearchUser term={searchTerm} searchKeyword={searchHandler} /></Nav>
            </Nav>
          </Container>
        </Navbar>
      </div>
      
      <div className="container">
        <Header title="User List" />
        <Users users={searchTerm.length < 1 ? users : searchResults} onDelete={deleteUser} />
      </div>

      <div className="side-drawer">
        <AddPost onPost={addPost} />
        <Posts posts={posts} onDelete={deletePost} />
      </div>
    </div>
  );
}

export default App;