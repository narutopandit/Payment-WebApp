import { useState } from "react";
import { Button } from "../component/button";
import { Heading } from "../component/heading";
import { InputBox } from "../component/inputbox";
import { Popup } from "../component/pop";
import { SubHead } from "../component/subheading";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export function Signin() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    return <div className="bg-gray-200 flex justify-center w-screen h-screen items-center">
        <div className="bg-white w-80 h-96 rounded-md border-none flex flex-col items-center pt-6 shadow-lg">
            <Heading title={"Sign in"} />
            <SubHead data={"Enter your credentials to access your account"} />
            <InputBox label={"Email"} holder={"xyz@gmail.com"} onChange={e=>{
                setEmail(e.target.value);
            }}/>
            <InputBox label={"Password"} holder={"******"} onChange={e=>{
                setPassword(e.target.value);
            }}/>
            <Button title={"Sign In"} onClick={async()=>{
                const resp = await axios.post('http://localhost:3000/api/v1/user/signin',{
                    email,
                    password
                });if(resp){
                    localStorage.setItem('token',resp.data.token)
                    navigate('/dashboard');
                }
            }} variant={"P"}/>
            <Popup data={"Don`t have an account?"} linkText={"Sign up"} to={"/signup"}/>
        </div>
    </div>
}