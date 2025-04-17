import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Link from "next/link"

const Hero = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-6">
          <h1 className="text-3xl font-bold text-blue-600">Medusa Store</h1>
          <nav className="space-x-4">
            <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600">Contact</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-8">
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 text-center">
          <Heading className="text-4xl font-bold mb-4 text-blue-600">Welcome to Medusa Store</Heading>
          <p className="text-gray-700 mb-6">
            Explore our amazing collection of products and shop with ease.
          </p>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Github /> <span>View on GitHub</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((product) => (
            <div key={product} className="bg-white p-4 rounded-xl shadow-md">
              <div className="h-48 bg-gray-200 mb-4 rounded-xl"></div>
              <h3 className="text-xl font-bold text-blue-600">Product {product}</h3>
              <p className="text-gray-700 mt-2 mb-4">Description of product {product}.</p>
              <Button className="w-full">View Details</Button>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-white mt-10 py-6">
        <div className="container mx-auto text-center text-gray-700">
          © 2025 Medusa Store. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Hero;
