export function Button({title,variant,onClick}){
    let sTyle = "";
    if(variant=="P"){
        sTyle="w-full bg-black text-white font-normal rounded-md h-9 my-2 transition duration-200 ease-in-out hover:bg-sky-400";
    }else if(variant=="S"){
        sTyle="w-full text-white bg-green-500 text-white font-normal rounded-md h-9 my-2 transition duration-200 ease-in-out hover:bg-sky-400";
    }
    return <div className="w-11/12">
        <button className={`${sTyle}`} onClick={onClick}>{title}</button>
    </div>
}