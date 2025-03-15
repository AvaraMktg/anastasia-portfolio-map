import { useState } from "react";
import { Link } from "react-router-dom";
import ContactForm from "@/components/ContactForm";
import PropertyCard from "@/components/PropertyCard";
import propertyData from "@/lib/propertyData";
import { MapPinIcon, PhoneIcon, MailIcon } from "lucide-react";

const Index = () => {
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);
  const featuredProperties = propertyData.filter(property => property.status !== "sold").slice(0, 3);

  return (
    <main className="bg-white">
      {/* Hero Section */}
      <section className="hero-section bg-real-50">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-real-950 mb-4">
              Find Your Dream Home in South Florida
            </h1>
            <p className="text-xl text-real-700 mb-8">
              Expert real estate services with Anastasia Krasun, a premier Florida realtor with international expertise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/properties" className="btn-primary">
                Browse Properties
              </Link>
              <a href="#contact" className="btn-outline">
                Contact Anastasia
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/2 order-1 md:order-2">
            <div className="rounded-lg overflow-hidden border-4 border-white shadow-xl">
              <img
                src="https://imagescdn.homes.com/i2/1sAclGLz0A2IVClXD5yTlr_jX0yrBNHXiSpFbjq-cyQ/117/anastasia-krasun-voropaieva.jpg?p=1"
                alt="Anastasia Krasun"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="bg-real-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-real-950 mb-2 text-center">
            Featured Properties
          </h2>
          <p className="text-real-700 text-center mb-12 max-w-2xl mx-auto">
            Browse through Anastasia's selection of premium properties in the most desirable locations.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard 
                key={property.id} 
                property={property}
                onHover={() => setSelectedProperty(property.id)}
                onLeave={() => setSelectedProperty(null)}
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/properties" className="btn-primary inline-block">
              View All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-16" id="about">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-real-950 mb-6">
                About Anastasia
              </h2>
              <div className="prose max-w-none text-real-700">
                <p className="mb-4">
                  Anastasia Krasun, a dedicated premier Florida realtor with RelatedISG Realty, brings a unique blend of international experience with fluency in 5 foreign languages, academic excellence, and market expertise to the vibrant counties all over South Florida real estate market.
                </p>
                <p className="mb-4">
                  Born and raised in the city of Odessa, Ukraine, Anastasia moved to the United States at the age of 15 to build a better future for herself, embarking on an immigrant journey that has shaped her into one of the top-producing real estate professionals in the area.
                </p>
                <p className="mb-8">
                  Her personal area of expertise concentrates on flip properties, most exclusive primary residence neighborhoods, income producing businesses, properly zoned buildable land lots and rental investment properties.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-real-50 p-4 rounded-lg">
                    <p className="font-semibold text-real-950">Home Types</p>
                    <p>Condo, House</p>
                  </div>
                  <div className="bg-real-50 p-4 rounded-lg">
                    <p className="font-semibold text-real-950">Languages</p>
                    <p>English, French, Russian, Turkish, Ukrainian</p>
                  </div>
                  <div className="bg-real-50 p-4 rounded-lg">
                    <p className="font-semibold text-real-950">Experience</p>
                    <p>4+ Years</p>
                  </div>
                  <div className="bg-real-50 p-4 rounded-lg">
                    <p className="font-semibold text-real-950">License</p>
                    <p>#3524077</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-real-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-real-950 mb-4">Educational Background</h3>
              <ul className="space-y-4">
                <li className="flex gap-4">
                  <div className="h-full">
                    <div className="w-3 h-3 bg-gold-400 rounded-full mt-1.5"></div>
                    <div className="w-0.5 h-full bg-gold-200 mx-auto"></div>
                  </div>
                  <div>
                    <p className="font-semibold">Associate's Degree</p>
                    <p className="text-real-700">St. Louis, MO</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="h-full">
                    <div className="w-3 h-3 bg-gold-400 rounded-full mt-1.5"></div>
                    <div className="w-0.5 h-full bg-gold-200 mx-auto"></div>
                  </div>
                  <div>
                    <p className="font-semibold">Bachelor's Degree in Real Estate & Finance</p>
                    <p className="text-real-700">Baruch College, New York</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div>
                    <div className="w-3 h-3 bg-gold-400 rounded-full mt-1.5"></div>
                  </div>
                  <div>
                    <p className="font-semibold">Currently Studying Law</p>
                    <p className="text-real-700">Florida International University (FIU), Miami</p>
                  </div>
                </li>
              </ul>
              <div className="mt-8">
                <h3 className="text-xl font-bold text-real-950 mb-4">K&K Real Estate Group</h3>
                <p className="text-real-700">
                  Founder of an elite team serving clients looking to buy, sell or invest in both Residential & Commercial Real Estate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-real-50 py-16" id="contact">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-real-950 mb-2 text-center">
            Contact Anastasia
          </h2>
          <p className="text-real-700 text-center mb-12 max-w-2xl mx-auto">
            Reach out to schedule a consultation or learn more about available properties.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <ContactForm />
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-real-950 mb-6">Get In Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <PhoneIcon className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-real-950">Phone</p>
                    <a href="tel:+16464440474" className="text-real-700 hover:text-gold-600 transition-colors">
                      (646) 444-0474
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <MailIcon className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-real-950">Email</p>
                    <a href="mailto:anastasia@relatedisg.com" className="text-real-700 hover:text-gold-600 transition-colors">
                      anastasia@relatedisg.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full">
                    <MapPinIcon className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-real-950">Serving Areas</p>
                    <p className="text-real-700">
                      Miami-Dade, Broward, and Palm Beach Counties
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-real-50 rounded-lg">
                <h4 className="font-semibold text-real-950 mb-2">RelatedISG Realty, LLC.</h4>
                <p className="text-real-700 mb-2">Licensed Real Estate Agent</p>
                <p className="text-real-700">License #3524077</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
