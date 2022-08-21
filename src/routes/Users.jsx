import React, { useEffect, useRef, useState } from 'react'
import Loading from '../components/Loading';
import UserContainer from '../components/UserContainer';

function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(null);
    let baseUrl = "https://api.github.com/users";
    const user = useRef('');

    async function allUsers() {
        if(user.current.value === '') {
            setLoading(true);
            const res = await fetch(baseUrl);
            const data = await res.json();
            //console.log(data);
            setUsers(data);
            setLoading(null);
        }
    }

    async function findUser() {
        setLoading(true)
        if(user.current.value !== ''){
            setUsers("");
            const res = await fetch(baseUrl+"/"+user.current.value);
            const data = await res.json();
            setUsers(() => [data]);
            user.current.value = "";
        }
        else{
            allUsers();
        }
        setLoading(null);
    }

    useEffect(() => {
        allUsers();
    }, [setUsers]);

    return (
        <div>
            <div className='flex justify-center items-center h-11 my-5'>
                <input type="text" ref={user} placeholder='Search github username...' className='h-full md:w-1/3 w-2/3 text-gray-800 px-2 font-semibold outline-none' />
                <button onClick={findUser} className='bg-teal-500 font-semibold px-4 h-full'>Search</button>
            </div>
            { loading ? <Loading /> : <UserContainer users={users}/>}
        </div>
    )
}

export default Users;