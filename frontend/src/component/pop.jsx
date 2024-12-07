import { Link } from "react-router-dom";

export function Popup({data, linkText, to}){
    return <div className="flex text-sm font-medium">
        <div>
            {data}
        </div>
        <Link className="text-blue-600 pl-1 underline cursor-pointer" to={to}>
        {linkText}
        </Link>
    </div>
}