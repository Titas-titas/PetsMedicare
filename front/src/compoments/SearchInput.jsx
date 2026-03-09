
function SearchInput({value, onChange}) {
    return(
        <div className="inline">
            <input type="text" placeholder="Search" className="border  border-gray-500" value={value} onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default SearchInput