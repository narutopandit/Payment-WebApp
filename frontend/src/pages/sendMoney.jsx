import { useState } from "react";
import { Button } from "../component/button";
import { Heading } from "../component/heading";
import { InputBox } from "../component/inputbox";
import { useLocation } from "react-router-dom";

import axios from 'axios';
export function SendMoney(){
    const location = useLocation();
    const {Name,Email,id} = location.state || {};
    const [amount,setAmount] = useState(0);
    const firstLetter = Name[0];
    return <div className="bg-gray-200 flex justify-center w-screen h-screen items-center">
             <div className="bg-white w-96 h-3/6 rounded-md border-none flex flex-col items-center pt-6 shadow-lg">
                <Heading title={"Send Money"}/>
                <div className="w-full pl-5 mt-16">
                    <div className="flex h-14 items-center">
                    <div className="w-14 h-full bg-green-500 text-white flex justify-center items-center rounded-full font-semibold">
                        {firstLetter.toUpperCase()}
                    </div>
                    <div className="ml-2 font-semibold text-lg">
                        {Name.toUpperCase()}
                    </div>
                    
                </div>
                <div className="my-2">
                     {Email}
                </div>
                <InputBox label={"Amount (in Rs)"} holder={"Enter amount"} onChange={e=>{
                setAmount(parseFloat(e.target.value));
            }}/>
                <Button title={"Transfer Money"} variant={"S"} onClick={async()=>{
                      if (amount <= 0) {
                        alert("Please enter a valid amount greater than zero.");
                        return;
                    }
                    try {
                        const resp = await axios.put('http://localhost:3000/api/v1/account/transfer', {
                            amount,
                            to: id
                        }, {
                            headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
                        });
                
                        alert(resp.data.msg);
                    } catch (error) {
                        if (error.response) {
                            // Server responded with a status other than 2xx
                            alert("Error: " + error.response.data.msg || "An error occurred.");
                        } else if (error.request) {
                            // Request was made but no response was received
                            alert("No response from server. Please try again later.");
                        } else {
                            // Something happened in setting up the request
                            alert("Error: " + error.message);
                        }
                    }
                }}/>
                </div>
        </div>
     </div>
}