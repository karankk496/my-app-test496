"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShoppingCart, Search, User, Menu, Heart, MapPin } from "lucide-react"

export default function Header() {
  const [cartItems] = useState(3)

  return (
    <header className="border-b">
      {/* Top Bar */}
      <div className="bg-green-600 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Deliver to: New York, NY 10001</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>📞 Call us: (555) 123-4567</span>
            <span>🕒 Store Hours: 7AM - 10PM</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <span className="text-xl font-bold">SG</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-green-600">Sanjay Grocery</h1>
              <p className="text-xs text-gray-600">Store & Market</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search for products, brands, and more..." className="pl-10 pr-4 py-2 w-full" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Heart className="h-5 w-5 mr-1" />
              Wishlist
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5 mr-1" />
                  Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/register">Create Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/cart">
              <Button className="relative">
                <ShoppingCart className="h-5 w-5 mr-1" />
                Cart
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs">{cartItems}</Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-t bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Menu className="h-4 w-4" />
                  All Categories
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Fruits & Vegetables</DropdownMenuItem>
                <DropdownMenuItem>Dairy & Eggs</DropdownMenuItem>
                <DropdownMenuItem>Meat & Seafood</DropdownMenuItem>
                <DropdownMenuItem>Bakery</DropdownMenuItem>
                <DropdownMenuItem>Pantry</DropdownMenuItem>
                <DropdownMenuItem>Beverages</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-6 text-sm">
              <Link href="/deals" className="hover:text-green-600">
                Today's Deals
              </Link>
              <Link href="/fresh" className="hover:text-green-600">
                Fresh Produce
              </Link>
              <Link href="/organic" className="hover:text-green-600">
                Organic
              </Link>
              <Link href="/bulk" className="hover:text-green-600">
                Bulk Items
              </Link>
              <Link href="/about" className="hover:text-green-600">
                About Us
              </Link>
              <Link href="/contact" className="hover:text-green-600">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
