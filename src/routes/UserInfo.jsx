import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Events from '../components/Events';
import Loading from '../components/Loading';
import Repo from '../components/Repo';
import Tabs from '../components/Tabs';
import UserContainer from '../components/UserContainer';

function UserInfo() {
    const [user, setUser] = useState([]);
    const [type, setType] = useState("repos");
    const [infos, setInfos] = useState([]);
    const [loading, setLoading] = useState(null);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    let baseUrl = "https://api.github.com/users";

    async function getUserInfo() {
        setLoading(true)
        const res = await fetch(baseUrl + pathname);
        const data = await res.json();
        setUser(() => [data])
        setLoading(null)
    }

    async function getUrls() {
        setUser([]);
        setLoading(true);
        const res = await fetch(baseUrl + pathname + `/${type}`);
        const data = await res.json();
        // console.log(data);
        setInfos(data);
        setLoading(null);
    }

    useEffect(() => {
        getUserInfo();
        getUrls();
        // console.log(user);
        // console.log(type);
    }, [pathname, type])

  return (
    <div className='py-5'>
        <button onClick={() => navigate('/')} className='px-5 py-1 font-medium mx-1 my-4 bg-teal-600 rounded text-gray-200'>
            Back
        </button>
        {
            user && user?.map((uinfo, i) => (
                <div key={i} className='flex justify-center md:flex-row md:px-0 px-4 flex-col gap-10'>
                    <img src={uinfo.avatar_url} className='w-[350px] border-4 border-teal-400 md:mx-0 mx-auto' alt="" />
                    <div className='text-lg px-3 leading-10'>
                        <h1 className='text-3xl pb-4'>{uinfo?.name}</h1>
                        <h1>
                            <span className='text-teal-400'>Login_name</span> : {uinfo?.login}
                        </h1>
                        <h1>
                            <span className='text-teal-400'>Followers : </span>{uinfo?.followers}
                        </h1>
                        <h1>
                            <span className='text-teal-400'>Following : </span>{uinfo?.following}
                        </h1>
                        <h1>
                            <span className='text-teal-400'>Public_Repositories : </span>{uinfo?.public_repos}
                        </h1>
                        <h1>
                            <span className='text-teal-400'>Joined_At : </span>{new Date(uinfo?.created_at).toLocaleDateString()}
                        </h1>
                        <h1>
                            <span className='text-teal-400'>Last_Update : </span>{new Date(uinfo?.updated_at).toLocaleDateString()}
                        </h1>
                        <a href={uinfo?.html_url} className='text-gray-200 font-semibold rounded cursor-pointer px-4 py-1 bg-teal-600 my-3 tracking-wide' target='_blank'>
                            Visit
                        </a>
                    </div>
                </div>
            ))
        }
        <div className='flex border-b pb-4 gap-6 mt-[10%] mb-6 justify-center md:text-xl'>
            <Tabs type={type} setType={setType} />
        </div>

        {loading && <Loading />}
        {
            type === "repos" && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
                    {infos && <Repo repos={infos} />}
                </div>
            )
        }

        {
            type === "received_events" && (
                <div className="grid md:grid-cols-2 grid-cols-1 gap-7 w-10/12 mx-auto">
                    {infos && <Events events={infos} />}
                </div>
            )
        }

        {
            type === "followers" && (
                <div>
                    <UserContainer users={infos} />
                </div>
            )
        }
    </div>
  )
}

export default UserInfo;