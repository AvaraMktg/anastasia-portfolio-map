import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import propertyData from "@/lib/propertyData";
import Map from "@/components/map";
import Gallery from "@/components/Gallery";
import { BedIcon, BathIcon, Square, Calendar, Tag, Home } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  
  useEffect(() => {
    const foundProperty = propertyData.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      window.scrollTo(0, 0);
    }
  }, [id]);
  
  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-real-950 mb-4">Property Not Found</h1>
          <Link to="/properties" className="text-gold-500 hover:underline">
            Return to Properties
          </Link>
        </div>
      </div>
    );
  }

  const formattedPrice = property.price.replace("per month", "").trim();
  
  return (
    <main className="bg-white pb-16">
      <div className="container mx-auto px-4">
        <div className="py-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link to="/" className="text-sm text-real-600 hover:text-gold-500">
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-real-400">/</span>
                  <Link to="/properties" className="text-sm text-real-600 hover:text-gold-500">
                    Properties
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <span className="mx-2 text-real-400">/</span>
                  <span className="text-sm text-real-800 font-medium truncate max-w-[200px]">
                    {property.address.split(',')[0]}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-real-950">
                {property.address.split(',')[0]}
              </h1>
              <p className="text-real-700 mt-2">
                {property.address.split(',').slice(1).join(',')}
              </p>
              {property.neighborhood && (
                <p className="text-gold-600 mt-1">{property.neighborhood}</p>
              )}
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-real-950">{formattedPrice}</p>
              <p className="text-real-700">{property.estimatedPayment}</p>
              {property.status === 'active' && <span className="inline-block mt-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">For Sale</span>}
              {property.status === 'forRent' && <span className="inline-block mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">For Rent</span>}
              {property.status === 'sold' && <span className="inline-block mt-2 bg-real-100 text-real-800 px-3 py-1 rounded-full text-sm font-medium">Sold</span>}
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <Gallery images={property.images} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-real-50 p-4 rounded-lg flex flex-col items-center">
                <BedIcon className="h-6 w-6 text-gold-500 mb-2" />
                <span className="font-bold text-xl">{property.beds}</span>
                <span className="text-real-600 text-sm">Bedrooms</span>
              </div>
              <div className="bg-real-50 p-4 rounded-lg flex flex-col items-center">
                <BathIcon className="h-6 w-6 text-gold-500 mb-2" />
                <span className="font-bold text-xl">{property.baths}</span>
                <span className="text-real-600 text-sm">Bathrooms</span>
              </div>
              {property.sqft && (
                <div className="bg-real-50 p-4 rounded-lg flex flex-col items-center">
                  <Square className="h-6 w-6 text-gold-500 mb-2" />
                  <span className="font-bold text-xl">{property.sqft}</span>
                  <span className="text-real-600 text-sm">Sq Ft</span>
                </div>
              )}
              {property.built && (
                <div className="bg-real-50 p-4 rounded-lg flex flex-col items-center">
                  <Calendar className="h-6 w-6 text-gold-500 mb-2" />
                  <span className="font-bold text-xl">{property.built}</span>
                  <span className="text-real-600 text-sm">Year Built</span>
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-real-950 mb-4">About This Home</h2>
              <div className="prose max-w-none text-real-700">
                <p>{property.description}</p>
              </div>
            </div>
            
            {property.features && property.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-real-950 mb-4">Features</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {property.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-gold-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {property.status === 'sold' && (
              <div className="mb-8 bg-real-50 p-6 rounded-lg">
                <h2 className="text-xl font-bold text-real-950 mb-4">Sale Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  {property.daysOnMarket && (
                    <div>
                      <p className="text-real-600 text-sm">Days on Market</p>
                      <p className="font-semibold">{property.daysOnMarket} Days</p>
                    </div>
                  )}
                  {property.soldDate && (
                    <div>
                      <p className="text-real-600 text-sm">Date Sold</p>
                      <p className="font-semibold">{property.soldDate}</p>
                    </div>
                  )}
                  {property.soldPrice && (
                    <div>
                      <p className="text-real-600 text-sm">Sold Price</p>
                      <p className="font-semibold">{property.soldPrice}</p>
                    </div>
                  )}
                  {property.pricePerSqft && (
                    <div>
                      <p className="text-real-600 text-sm">Price per Sq Ft</p>
                      <p className="font-semibold">{property.pricePerSqft}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white border border-real-100 rounded-lg overflow-hidden shadow-md">
                <h3 className="text-lg font-semibold p-4 border-b border-real-100">Location</h3>
                <div className="h-[300px]">
                  <Map 
                    properties={[property]}
                    selectedProperty={property.id}
                    setSelectedProperty={() => {}}
                    zoom={15}
                  />
                </div>
              </div>
              
              <div className="bg-white border border-real-100 rounded-lg overflow-hidden shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Listed By</h3>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://imagescdn.homes.com/i2/1sAclGLz0A2IVClXD5yTlr_jX0yrBNHXiSpFbjq-cyQ/117/anastasia-krasun-voropaieva.jpg?p=1"
                    alt="Anastasia Krasun"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">Anastasia Krasun Voropaieva</p>
                    <p className="text-real-600 text-sm">Related ISG Realty, LLC.</p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div>
                    <p className="text-real-600 text-sm">License</p>
                    <p className="font-semibold">#3524077</p>
                  </div>
                  <div>
                    <p className="text-real-600 text-sm">Phone</p>
                    <a 
                      href="tel:+16464440474" 
                      className="font-semibold text-gold-600 hover:underline"
                    >
                      (646) 444-0474
                    </a>
                  </div>
                  <div>
                    <p className="text-real-600 text-sm">Email</p>
                    <a 
                      href="mailto:anastasia@relatedisg.com" 
                      className="font-semibold text-gold-600 hover:underline"
                    >
                      anastasia@relatedisg.com
                    </a>
                  </div>
                </div>
                
                {property.listingAgent?.name === "Burak Kus" && (
                  <>
                    <Separator className="my-4" />
                    <div className="mb-3">
                      <p className="text-real-600 text-sm">Co-Listing Agent</p>
                      <p className="font-semibold">Burak Kus</p>
                      <p className="text-real-600 text-sm">License #3595722</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PropertyDetail;
