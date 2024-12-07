import { useEffect, useState } from "react";
import { AppBar } from "../component/appbar";
import { Balance } from "../component/balance";
import { UsersComp } from "../component/users";
import axios from 'axios';
export default function DashBoard(){
    const [user,setUser] = useState("");
    const [amount,setAmount] = useState(0);
    const [usersList, setUsersList] = useState([]); // Added state to store fetched users

    useEffect(() => {
        const fetchUsers = async () => {
            const resp = await axios.get(`http://localhost:3000/api/v1/user/bulk?filter=${user}`, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } // Fixed header formatting
            });
            setUsersList(resp.data.user); // Store fetched users in state
        };

        if (user) { // Only fetch if user input is not empty
            fetchUsers();
        }
    }, [user]);

    useEffect(()=>{
        const fetchBalance = async()=>{
           const balance = await axios.get('http://localhost:3000/api/v1/account/balance',{
                headers:{Authorization:'Bearer '+localStorage.getItem('token')}
            })

            setAmount(balance.data.balance);
            } 
            fetchBalance();
        }
    ,[]);

    return <div className=" w-full">
        <AppBar/>
        <Balance amount={amount}/>
        <div className="w-full px-4">
        <div className="w-full">
            <div className="font-bold text-sm mb-1 ml-1">
                Users
            </div>
        <input className="border-2 border-gray-300 rounded-md p-2 w-full h-9" type="text" placeholder="Search users...." onInput={async(e)=>{
                setUser(e.target.value);
            } }/>
    </div>
        </div>
        {Array.isArray(usersList) && usersList.map((user) =>{ 
            return( // Check if usersList is an array before mapping
            <UsersComp key={user.id} Name={`${user.firstName} ${user.lastName}` } Email={user.email} id={user._id} />
)})}
    </div>
}