import {useRef} from 'react';
import { FaSearch} from 'react-icons/fa';
const SearchUser = (props) => {
    const inputEl = useRef("");

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value)
    };
    return (
        <div>
            <h3><FaSearch /> User</h3>
            
            <input type="text" placeholder="Type any keywords..." value={props.term} onChange = {getSearchTerm} ref={inputEl}/>
        </div>
    )
}

export default SearchUser