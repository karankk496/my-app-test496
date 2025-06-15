"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Star, Grid, List } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Fresh Organic Bananas",
    price: 2.99,
    originalPrice: 3.49,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    category: "Fruits",
    inStock: true,
    description: "Sweet and ripe organic bananas, perfect for snacking",
  },
  {
    id: 2,
    name: "Basmati Rice 5kg",
    price: 12.99,
    originalPrice: 15.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    category: "Grains",
    inStock: true,
    description: "Premium quality basmati rice, aromatic and fluffy",
  },
  {
    id: 3,
    name: "Fresh Milk 1L",
    price: 3.49,
    originalPrice: 3.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    category: "Dairy",
    inStock: true,
    description: "Fresh whole milk from local farms",
  },
  {
    id: 4,
    name: "Whole Wheat Bread",
    price: 2.49,
    originalPrice: 2.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.3,
    category: "Bakery",
    inStock: false,
    description: "Freshly baked whole wheat bread, soft and nutritious",
  },
  {
    id: 5,
    name: "Red Apples 1kg",
    price: 4.99,
    originalPrice: 5.99,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    category: "Fruits",
    inStock: true,
    description: "Crisp and sweet red apples, perfect for eating fresh",
  },
  {
    id: 6,
    name: "Greek Yogurt 500g",
    price: 5.49,
    originalPrice: 6.49,
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.4,
    category: "Dairy",
    inStock: true,
    description: "Creamy Greek yogurt, high in protein",
  },
]

const categories = ["All", "Fruits", "Dairy", "Grains", "Bakery", "Vegetables", "Meat"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("name")
  const [viewMode, setViewMode] = useState("grid")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredProducts = products
    .filter(
      (product) =>
        (selectedCategory === "All" || product.category === selectedCategory) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "rating":
          return b.rating - a.rating
        default:
          return a.name.localeCompare(b.name)
      }
    })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Products</h1>
        <p className="text-gray-600">Discover our wide range of fresh and quality products</p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex border rounded-lg">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"}`}
      >
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className={`p-4 ${viewMode === "list" ? "flex gap-4" : ""}`}>
              <div className={`relative mb-4 ${viewMode === "list" ? "w-32 h-32 mb-0" : ""}`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className={`object-cover rounded-lg ${viewMode === "list" ? "w-32 h-32" : "w-full h-48"}`}
                />
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-2 left-2 bg-red-500">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
                {!product.inStock && <Badge className="absolute top-2 right-2 bg-gray-500">Out of Stock</Badge>}
              </div>

              <div className={`space-y-2 ${viewMode === "list" ? "flex-1" : ""}`}>
                <Badge variant="secondary" className="text-xs">
                  {product.category}
                </Badge>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <Button className="w-full" size="sm" disabled={!product.inStock}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
