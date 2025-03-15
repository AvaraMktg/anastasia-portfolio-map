
import { useState } from "react";
import PropertyCard from "@/components/PropertyCard";
import propertyData from "@/lib/propertyData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PropertiesPage = () => {
  const [filter, setFilter] = useState<string>("all");
  
  const filteredProperties = filter === "all" 
    ? propertyData 
    : propertyData.filter(property => {
        if (filter === "active") return property.status === "forSale";
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
            Click on a property to view details.
          </p>
          
          <div className="sticky top-[80px] z-20 bg-white py-4 border-b border-real-100 mb-8">
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
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
      </section>
    </main>
  );
};

export default PropertiesPage;
