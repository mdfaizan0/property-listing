import { useState } from "react"
import "./PropertyCard.css"
import PropertyModal from "./PropertyModal"

const dummyImg = "https://dummyimage.com/400x280/cccccc/000000.jpg&text=Image+Not+Found"

function PropertyCard({ property }) {
  const [showModal, setShowModal] = useState(false)
  const { name, type, price, location, description, image } = property

  function formatPrice() {
    let newPrice = ""
    if (price < 9900000) {
      if (price % 100000 == 0) {
        newPrice = `₹ ${Math.floor(price / 100000)} Lac`
      } else {
        newPrice = `₹ ${(price / 100000).toFixed(1)} Lac`
      }
    } else if (price < 990000000) {
      if (price % 10000000 == 0) {
        newPrice = `₹ ${Math.floor(price / 10000000)} Cr`
      } else {
        newPrice = `₹ ${(price / 10000000).toFixed(1)} Cr`
      }
    }
    return newPrice
  }

  return (
    <div className="property-card">
      <div className="property-details">
        <img src={image} alt={`${name.split(" ").join("-")}-img`} onError={(e) => { e.target.onError = null; e.target.src = dummyImg }} loading="lazy" />
        <div className="prop-details">
          <h2>{name}</h2>
          <span className="prop-type">{type}</span>
          <span className="prop-location">{location}</span>
          <span className="prop-price">{formatPrice()}</span>
          <span className="prop-desc">{description}</span>
          <button className="property-card-btn" onClick={() => setShowModal(!showModal)}>View</button>
        </div>
      </div>
      {showModal && <PropertyModal property={property} isOpen={showModal} onClose={() => setShowModal(false)} />}
    </div>
  )
}

export default PropertyCard