import React, { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";
import { createProperty } from "../features/propertySlice";

interface PropertyFormData {
  title: string;
  address: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  sqft: string;
  yearBuilt: string;
  description: string;
  lotSize: string;
  parking: string;
  heating: string;
  cooling: string;
  features: string;
  imageUrls: string;
  propertyType: string;
  latitude: string;
  longitude: string;
}

interface CreatePropertyProps {
  onClose: () => void;
}

const CreateProperty: React.FC<CreatePropertyProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    address: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    yearBuilt: "",
    description: "",
    lotSize: "",
    parking: "",
    heating: "",
    cooling: "",
    features: "",
    imageUrls: "",
    propertyType: "",
    latitude: "",
    longitude: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const featuresArray = formData.features
      .split(",")
      .map((feature) => feature.trim())
      .filter((feature) => feature.length > 0);

    const imageUrlsArray = formData.imageUrls
      .split(",")
      .map((url) => url.trim())
      .filter((url) => url.length > 0);

    dispatch(
      createProperty({
        title: formData.title,
        address: formData.address,
        price: Number(formData.price),
        bedrooms: Number(formData.bedrooms),
        bathrooms: Number(formData.bathrooms),
        sqft: Number(formData.sqft),
        yearBuilt: formData.yearBuilt ? Number(formData.yearBuilt) : undefined,
        lotSize: formData.lotSize || undefined,
        parking: formData.parking || undefined,
        heating: formData.heating || undefined,
        cooling: formData.cooling || undefined,
        description: formData.description,
        features: featuresArray,
        images:
          imageUrlsArray.length > 0
            ? imageUrlsArray
            : ["https://via.placeholder.com/800x600"],
        propertyType: formData.propertyType as
          | "House"
          | "Condo"
          | "Townhouse"
          | "Apartment",
        isFavorited: false,

        coordinates: [
          parseFloat(formData.latitude),
          parseFloat(formData.longitude),
        ],
      })
    );

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="h-6 w-6" />
        </button>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">Create New Property</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Title*
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address*
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Latitude*
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                  step="any"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Longitude*
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                  step="any"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {["price", "bedrooms", "bathrooms", "sqft"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}*
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Year Built
                </label>
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Property Type*
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-white"
                >
                  <option value="" disabled>
                    Select Property Type
                  </option>
                  <option value="House">House</option>
                  <option value="Condo">Condo</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Apartment">Apartment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lot Size
                </label>
                <input
                  type="text"
                  name="lotSize"
                  value={formData.lotSize}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description*
              </label>
              <textarea
                rows={4}
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["parking", "heating", "cooling"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {field}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={(formData as any)[field]}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image URLs (comma separated)
                </label>
                <input
                  type="text"
                  name="imageUrls"
                  value={formData.imageUrls}
                  onChange={handleChange}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Features (comma separated)*
                </label>
                <input
                  type="text"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  required
                  placeholder="Swimming Pool, Garden, Garage, etc."
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Create Property
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProperty;
