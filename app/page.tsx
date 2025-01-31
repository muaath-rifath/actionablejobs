"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import Topbar from "@/components/Topbar"
import { Country, State, ICountry, IState } from "country-state-city"

const salaryRanges = [
  { label: "$30k - $50k", value: "30-50" },
  { label: "$50k - $80k", value: "50-80" },
  { label: "$80k - $120k", value: "80-120" },
  { label: "$120k - $160k", value: "120-160" },
  { label: "$160k+", value: "160+" },
]

export default function ActionableJobs() {
  const [selectedCountry, setSelectedCountry] = React.useState<string>("")
  const [selectedState, setSelectedState] = React.useState<string>("")
  const [countries] = React.useState<ICountry[]>(Country.getAllCountries())
  const [states, setStates] = React.useState<IState[]>([])

  const handleCountryChange = (value: string) => {
    setSelectedCountry(value)
    setSelectedState("")
    const countryStates = State.getStatesOfCountry(value)
    setStates(countryStates)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <Topbar />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border border-gray-200 mt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Input 
              placeholder="Job title or keyword" 
              className="w-full focus:ring-2 focus:ring-blue-600"
            />
            
            <Select onValueChange={handleCountryChange} value={selectedCountry}>
              <SelectTrigger className="focus:ring-2 focus:ring-blue-600">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              onValueChange={setSelectedState} 
              value={selectedState}
              disabled={!selectedCountry}
            >
              <SelectTrigger className="focus:ring-2 focus:ring-blue-600">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="focus:ring-2 focus:ring-blue-600">
                <SelectValue placeholder="Salary Range" />
              </SelectTrigger>
              <SelectContent>
                {salaryRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-all">
            Action
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border border-gray-200">
              <CardHeader>
                <CardTitle className="text-blue-900">Senior Software Engineer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-2 h-2 rounded-full bg-blue-600 mr-2"></span>
                  <p className="font-medium text-gray-800">TechInnovate Inc.</p>
                </div>
                <p className="text-gray-600">San Francisco, CA</p>
                <p className="text-blue-700 font-semibold">$140,000 - $180,000</p>
              </CardContent>
              <CardFooter>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 w-full"
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" className="text-blue-600 hover:bg-blue-50" />
            </PaginationItem>
            {[1, 2, 3].map((page) => (
              <PaginationItem key={page}>
                <PaginationLink 
                  href="#" 
                  className="text-blue-600 hover:bg-blue-50"
                  isActive={page === 1}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext href="#" className="text-blue-600 hover:bg-blue-50" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </main>
    </div>
  )
}
