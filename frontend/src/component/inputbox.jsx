export function InputBox({label,holder,onChange}){
    return <div className="w-11/12 py-2">
        <div className="font-semibold text-sm mb-1">
            {label}
        </div>
        <input className="border-2 border-gray-300 rounded-md p-2 w-full h-9" type="text" placeholder={holder} onChange={onChange} />
    </div>

}