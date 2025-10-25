import "./PropertyFilter.css"

function PropertyFilter({
  properties,
  setTypeSelected,
  setSearchTerm }) {
  const types = [...new Set(properties?.map(prop => prop.type))]

  return (
    <div className="property-filter">
      <div className="property-type-filter">
        <label value="">Filter by type:</label>
        <select name="type-filter" id="type-filter" onChange={e => setTypeSelected(e.target.value)}>
          <option value="">All</option>
          {types?.map((type, index) => {
            return <option key={index} value={type}>{type}</option>
          })}
        </select>
      </div>
      <div className="property-search">
        <input type="text" placeholder="Search for anything..." onChange={e => setSearchTerm(e.target.value)} />
      </div>
    </div>
  )
}

export default PropertyFilter