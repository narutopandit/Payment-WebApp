import { useNavigate } from "react-router-dom";

export function UsersComp({Name,Email,id}){
    const navigate = useNavigate();
    const firstLetter = Name[0];
    return <div className="w-full flex justify-between h-12 items-center px-5 mt-2">
        <div className="flex h-full items-center">
            <div className="h-full w-12 rounded-full bg-slate-200 flex justify-center items-center font-semibold text-purple-600">
                {firstLetter.toUpperCase()}
            </div>
            <div className="ml-2">
                {Name.toUpperCase()}
            </div>
        </div>
        <div className="ml-6">
            <button className="bg-black text-white w-28 h-8 rounded-md text-sm" onClick={()=>{
                navigate('/sendmoney',{state:{Name,Email,id}});
            }}>Send Money</button>
        </div>
    </div>
}