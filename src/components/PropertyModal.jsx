import { useEffect } from "react";
import "./PropertyModal.css"

const dummyImg = "https://dummyimage.com/400x280/cccccc/000000.jpg&text=Image+Not+Found"

function PropertyModal({ property, onClose, isOpen }) {
  const { name, type, price, location, description, image, amenities, latitude, longitude } = property

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <img src="https://img.icons8.com/?size=100&id=95867&format=png&color=000000" alt="modal-close" />
        </button>
        <div className="modal-image">
          <img src={image} alt={`${name.split(" ").join("-")}-img`} onError={(e) => { e.target.onError = null; e.target.src = dummyImg }} />
        </div>
        <div className="modal-info">
          <div className="modal-name-type">
            <h1>{`${name} in ${location.split(",")[0]}`}</h1>
            <span>{type}</span>
          </div>
          <p className="modal-price">{formatPrice()}</p>
          <p className="modal-location">{location}</p>
          <div className="modal-description">
            <h3>Description</h3>
            <p>{description}</p>
          </div>
          <h3>Amenities</h3>
          {amenities && amenities.length > 0 && (
            <div className="modal-amenities">
              {amenities.map((amenity, index) => (
                <div key={index} className="amenity-tag">{`✓ ${amenity}`}</div>
              ))}
            </div>
          )}
          <div className="modal-actions">
            <button>Contact Agent</button>
            {latitude && longitude && (<a style={{ display: latitude || longitude ? "block" : "none" }} target="_blank" href={`https://www.google.com/maps?q=${latitude},${longitude}`}>View on Map</a>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyModal