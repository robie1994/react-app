import { FaUsers } from 'react-icons/fa';
const Header = (props) => {
    return (
        <header className="header">
            <h1 style={{color: 'steelblue'}}><FaUsers style={{color: 'steelblue'}}/> {props.title}</h1>
        </header>
    )
}

export default Header