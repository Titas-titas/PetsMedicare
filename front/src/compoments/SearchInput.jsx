
function SearchInput({value, onChange}) {
    return(
        <div className="inline">
            <input type="text" placeholder="Search" className="border w-80 border-gray-500 p-2" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default SearchInput