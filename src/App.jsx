import { useEffect, useState } from "react"
import PropertyList from "./components/PropertyList"
import AddPropertyForm from "./components/AddPropertyForm"

function App() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchProperties() {
    try {
      const res = await fetch("http://localhost:3000/api/properties")
      const data = await res.json()
      setProperties(data)
    } catch (error) {
      console.error("Error fetching properties:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [])

  function handleFormData(formData) {
    fetch("http://localhost:3000/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then(res => {
        if (!res.ok) throw new Error("Failed to add property");
        return res.json();
      })
      .then(newProperty => {
        console.log("Property added:", newProperty);
        setProperties(prev => [...prev, newProperty])
      })
      .catch(err => console.error("❌ Error:", err));
  }

  return (
    <div className="app-content">
      {loading ? (
        <div className="loading-container">
          <div className="loading-msg"></div>
        </div>
      ) : (
        <>
          <PropertyList properties={properties} />
          <AddPropertyForm properties={properties} handleFormData={handleFormData} />
        </>
      )}
    </div>
  )
}

export default App