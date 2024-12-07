import { useNavigate } from "react-router-dom"

export function AppBar(){
    const navigate = useNavigate();
    return <div className="flex justify-between h-16 items-center shadow-md px-4 border-none">
        <div className="font-medium">
            PatYM App
        </div>
        <div className="h-14 flex justify-between items-center">
            <div className="mr-2 font-medium">
                Hello
            </div>
            <div className="w-14 h-full bg-slate-200 flex justify-center items-center rounded-full font-semibold">
                U
            </div>
            <div>
                {(localStorage.length!=0)?<button className="w-16 h-6 mx-2 text-lg text-blue-700 underline font-semibold" onClick={()=>{
                    localStorage.clear();
                    navigate('/signin');
                }}>Logout</button>:{}}
            </div>
        </div>
    </div>
}