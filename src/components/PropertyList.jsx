import { useState } from "react"
import PropertyCard from "./PropertyCard"
import PropertyFilter from "./PropertyFilter"
import "./PropertyList.css"

function PropertyList({ properties }) {
  const [typeSelected, setTypeSelected] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProperties = properties
    .filter(prop => typeSelected ? prop.type.toLowerCase() === typeSelected.toLowerCase() : true)
    .filter(prop => {
      if (!searchTerm) return true;

      const search = searchTerm.toLowerCase();
      return (
        prop.name.toLowerCase().includes(search) ||
        prop.location.toLowerCase().includes(search) ||
        prop.description.toLowerCase().includes(search) ||
        prop.amenities.some(amen => amen.toLowerCase().includes(search))
      );
    });

  return (
    <div className="property-list">
      <div className="property-header-filters">
        <h1 className="property-list-header">Property Listings</h1>
        <PropertyFilter
          properties={properties}
          setTypeSelected={setTypeSelected}
          setSearchTerm={setSearchTerm}
        />
      </div>
      <span className="mobile-view-tip">Tip: Tap on any card to view more.</span>
      {!filteredProperties.length ? <p className="no-data">No properties found.</p> :
        <div className="property-list-contents">
          {filteredProperties.map(property => {
            return <PropertyCard property={property} key={property.id} />
          })}
        </div>}
    </div>
  )
}

export default PropertyList