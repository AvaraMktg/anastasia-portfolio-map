
import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import Map from "@/components/Map";
import propertyData from "@/lib/propertyData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PropertiesPage = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  
  // Fix the filtering logic to correctly handle "active" filter
  const filteredProperties = filter === "all" 
    ? propertyData 
    : propertyData.filter(property => {
        if (filter === "active") return property.status === "active";
        return property.status === filter;
      });

  return (
    <main className="bg-white">
      <section className="pt-8 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-real-950 mb-4">
            Properties
          </h1>
          <p className="text-xl text-real-700 mb-8 max-w-3xl">
            Explore Anastasia's portfolio of luxury properties across South Florida. 
            Click on a property to view details or see its location on the map.
          </p>
          
          {/* Made this sticky with z-10 and a higher top value to account for navbar */}
          <div className="sticky top-24 z-10 bg-white py-4 border-b border-real-100 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
              <div>
                <p className="text-sm text-real-600 mb-1">Filter by</p>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Properties" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    <SelectItem value="active">For Sale</SelectItem>
                    <SelectItem value="forRent">For Rent</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <p className="text-real-700">
                {filteredProperties.length} properties found
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    onHover={() => setSelectedProperty(property.id)}
                    onLeave={() => setSelectedProperty(null)}
                  />
                ))}
              </div>
              
              {filteredProperties.length === 0 && (
                <div className="text-center py-12 bg-real-50 rounded-lg">
                  <p className="text-xl text-real-700">No properties found with the selected filter.</p>
                  <button 
                    onClick={() => setFilter("all")}
                    className="mt-4 px-4 py-2 bg-gold-400 text-white rounded hover:bg-gold-500 transition-colors"
                  >
                    View All Properties
                  </button>
                </div>
              )}
            </div>
            
            <div className="hidden lg:block">
              <div className="sticky top-32">
                <h3 className="text-lg font-semibold mb-4">Property Locations</h3>
                <div className="h-[600px] rounded-lg overflow-hidden shadow-md">
                  <Map 
                    properties={filteredProperties}
                    selectedProperty={selectedProperty}
                    setSelectedProperty={setSelectedProperty}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PropertiesPage;
