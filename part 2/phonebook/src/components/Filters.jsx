const Filters = ({ filterProp, setFilterProp }) => {
    return (
        <div>
            filter shown with: <input value={filterProp} onChange={(e) => setFilterProp(e.target.value)} />
        </div>
    )
}

export default Filters;