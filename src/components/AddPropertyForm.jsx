import "./AddPropertyForm.css"
import { useEffect, useState } from "react"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

function AddPropertyForm({ properties, handleFormData }) {
  const [name, setName] = useState("")
  const [type, setType] = useState()
  const [otherType, setOtherType] = useState("")
  const [isTypeOther, setIsTypeOther] = useState(false)
  const [location, setLocation] = useState({ area: "", city: "" })
  const [mapLocation, setMapLocation] = useState({ latitude: "", longitude: "" })
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [price, setPrice] = useState("")
  const [isSubmissable, setIsSubmissable] = useState(false)

  const animatedComponents = makeAnimated();
  const types = [...new Set(properties?.map(prop => prop.type))].map(type => {
    return { value: type, label: type }
  }).concat({ value: "Other", label: "Other" })
  const amenities = [...new Set(properties?.map(prop => prop.amenities).flat())].map(amen => {
    return { value: amen, label: amen }
  })


  const finalAmenities = selectedAmenities.map(amen => amen.value)
  const customStyles = {
    control: (base, state) => ({
      ...base,
      padding: "0.2rem 0.7rem",
      borderColor: state.isFocused ? "rgba(255, 78, 78, 0.786)" : "#e0e0e0",
      boxShadow: state.isFocused ? "0 0 0 1px rgba(255, 78, 78, 0.786)" : "none",
      "&:hover": {
        borderColor: "rgba(255, 78, 78, 0.5)",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      padding: 0,
    }),
    placeholder: (base) => ({
      ...base,
      color: "#333",
      opacity: 0.6,
      fontStyle: "italic"
    })
  };

  useEffect(() => {
    if (type?.value === "Other") {
      setIsTypeOther(true)
    } else {
      setIsTypeOther(false)
    }
  }, [type])

  function handleForm(e) {
    e.preventDefault()
    const formData = {
      name,
      type: !otherType ? type?.value : otherType,
      price,
      location: `${location.area}, ${location.city}`,
      latitude: Number(mapLocation.latitude),
      longitude: Number(mapLocation.longitude),
      description,
      image,
      amenities: finalAmenities
    }
    handleFormData(formData)
    setName(""); setType(null); setOtherType(""); setLocation({ area: "", city: "" }); setMapLocation({ latitude: "", longitude: "" }); setDescription(""); setImage(""); setSelectedAmenities([]); setPrice("");
  }

  useEffect(() => {
    const valid =
      name.trim() &&
      (type?.value !== "Other" ? type?.value : otherType.trim()) &&
      location.area.trim() &&
      location.city.trim() &&
      description.trim() &&
      price &&
      !isNaN(price) &&
      price > 0 &&
      finalAmenities.length > 0;

    setIsSubmissable(!valid);
  }, [name, type, otherType, location, description, price, finalAmenities]);

  return (
    <div className="add-property-form">
      <h1>Add a listing</h1>
      <form>
        <input id="name-input" required type="text" placeholder="Name of the property" value={name} onChange={e => setName(e.target.value)} />
        <div className="add-type">
          <Select
            options={types}
            value={type}
            onChange={setType}
            styles={customStyles}
            placeholder="Select type of the property.."
          />
          <input id="other-type-input" type="text" placeholder="Any other type?" value={otherType} style={{ display: isTypeOther ? "block" : "none" }} onChange={e => setOtherType(e.target.value)} />
        </div>
        <div className="add-location">
          <input required type="text" value={location.area} placeholder="Area" onChange={e => setLocation({ ...location, area: e.target.value })} />
          <input required type="text" value={location.city} placeholder="City" onChange={e => setLocation({ ...location, city: e.target.value })} />
        </div>
        <div className="add-map">
          <input
            type="number"
            placeholder="Latitude (Optional, Number)"
            value={mapLocation.latitude}
            onChange={e => setMapLocation({ ...mapLocation, latitude: e.target.value })}
          />
          <input
            type="number"
            placeholder="Longitude (Optional, Number)"
            value={mapLocation.longitude}
            onChange={e => setMapLocation({ ...mapLocation, longitude: e.target.value })}
          />
        </div>
        <div className="add-desc">
          <textarea
            required
            name="add-description"
            id="add-description"
            rows="4"
            maxlength="300"
            placeholder="Short description about the property..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="add-image">
          <input type="text" placeholder="Enter Image URL" value={image} onChange={e => setImage(e.target.value)} />
        </div>
        <div className="add-amenities">
          <Select
            required
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            options={amenities}
            value={selectedAmenities}
            onChange={setSelectedAmenities}
            placeholder="Search amenities (max 6)..."
            isOptionDisabled={() => selectedAmenities.length >= 6}
            styles={customStyles}
          />
        </div>
        <div className="add-price">
          <input required placeholder="Enter price" type="number" value={price} onChange={e => setPrice(e.target.value)} />
        </div>
        <button onClick={handleForm} disabled={isSubmissable}>Submit</button>
      </form>
    </div>
  )
}

export default AddPropertyForm