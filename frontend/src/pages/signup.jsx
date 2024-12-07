import { useState } from "react";
import { Button } from "../component/button";
import { Heading } from "../component/heading";
import { InputBox } from "../component/inputbox";
import { Popup } from "../component/pop";
import { SubHead } from "../component/subheading";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export function Signup(){
    const navigate = useNavigate();
    const [firstName,setFirstName] = useState("");
    const [lastName,setLastName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    return <div className="bg-gray-200 flex justify-center w-screen h-screen items-center">
        <div className="bg-white w-80 h-3/4 rounded-md border-none flex flex-col items-center pt-6 shadow-lg">
            <Heading title={"Sign up"} />
            <SubHead data={"Enter your information to create an account"} />

            <InputBox label={"First Name"} holder={"John"} onChange={e=>{
                setFirstName(e.target.value);
            }}/>
            <InputBox label={"Last Name"} holder={"Wick"} onChange={e=>{
                setLastName(e.target.value);
            }}/>
            <InputBox label={"Email"} holder={"xyz@gmail.com"} onChange={e=>{
                setEmail(e.target.value);
            }}/>
            <InputBox label={"Password"} holder={"******"} onChange={e=>{
                setPassword(e.target.value);
            }} />

            <Button title={"Sign up"} onClick={async()=>{
              let user = await axios.post('http://localhost:3000/api/v1/user/signup',{
                email,
                firstName,
                lastName,
                password
              });if(user){
                localStorage.setItem('token',user.data.token);
                navigate('/dashboard');
              }
              
            }} variant={"P"}/>
            <Popup data={"Already have an account?"} linkText={"Sign in"} to={"/signin"}/>
        </div>
    </div>
}