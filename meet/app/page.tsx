"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Search } from "lucide-react"

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  attendees: number
  maxAttendees: number
  category: string
  image: string
  price: string
}

const mockEvents: Event[] = [
  {
    id: 1,
    title: "Tech Innovation Summit 2024",
    description: "Join industry leaders discussing the future of technology and innovation.",
    date: "2024-03-15",
    time: "09:00 AM",
    location: "San Francisco Convention Center",
    attendees: 245,
    maxAttendees: 500,
    category: "Technology",
    image: "/tech-conference-networking.png",
    price: "$99",
  },
  {
    id: 2,
    title: "Creative Design Workshop",
    description: "Hands-on workshop exploring modern design principles and creative processes.",
    date: "2024-03-18",
    time: "02:00 PM",
    location: "Design Studio Downtown",
    attendees: 32,
    maxAttendees: 50,
    category: "Design",
    image: "/creative-design-workshop-with-artists.png",
    price: "Free",
  },
  {
    id: 3,
    title: "Startup Networking Mixer",
    description: "Connect with entrepreneurs, investors, and startup enthusiasts in your area.",
    date: "2024-03-20",
    time: "06:00 PM",
    location: "Innovation Hub",
    attendees: 89,
    maxAttendees: 150,
    category: "Networking",
    image: "/business-networking-event.png",
    price: "$25",
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass",
    description: "Learn advanced digital marketing strategies from industry experts.",
    date: "2024-03-22",
    time: "10:00 AM",
    location: "Marketing Academy",
    attendees: 156,
    maxAttendees: 200,
    category: "Marketing",
    image: "/digital-marketing-presentation-with-charts.png",
    price: "$149",
  },
  {
    id: 5,
    title: "Sustainable Living Fair",
    description: "Discover eco-friendly products and sustainable living practices.",
    date: "2024-03-25",
    time: "11:00 AM",
    location: "Green Park Pavilion",
    attendees: 78,
    maxAttendees: 300,
    category: "Lifestyle",
    image: "/sustainable-living-fair-with-eco-products.png",
    price: "Free",
  },
  {
    id: 6,
    title: "AI & Machine Learning Conference",
    description: "Explore the latest developments in artificial intelligence and ML.",
    date: "2024-03-28",
    time: "09:30 AM",
    location: "Tech Campus Auditorium",
    attendees: 312,
    maxAttendees: 400,
    category: "Technology",
    image: "/ai-conference-with-futuristic-technology-displays.png",
    price: "$199",
  },
]

const categories = ["All", "Technology", "Design", "Networking", "Marketing", "Lifestyle"]

export default function MeetEventPlatform() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
  }

  const handleJoinEvent = (eventId: number) => {
    console.log(`[v0] Joining event with ID: ${eventId}`)
    // Here you would typically handle the join event logic
    alert(`Successfully joined the event!`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Meet</h1>
              <p className="text-muted-foreground mt-1">Discover amazing events in your area</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Create Event</Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary hover:bg-primary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-accent group"
              onClick={() => handleEventClick(event)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-card/90 text-card-foreground">
                    {event.category}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-balance group-hover:text-primary transition-colors">
                    {event.title}
                  </CardTitle>
                  <span className="text-sm font-medium text-primary ml-2 flex-shrink-0">{event.price}</span>
                </div>
                <CardDescription className="text-sm text-muted-foreground text-pretty">
                  {event.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.attendees}/{event.maxAttendees} attendees
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleJoinEvent(event.id)
                    }}
                  >
                    Join Event
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No events found matching your criteria.</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Event Detail Modal/Overlay */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={selectedEvent.image || "/placeholder.svg"}
                alt={selectedEvent.title}
                className="w-full h-64 object-cover"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 bg-card/90"
                onClick={() => setSelectedEvent(null)}
              >
                ✕
              </Button>
            </div>

            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-2xl font-bold text-balance">{selectedEvent.title}</CardTitle>
                <Badge variant="secondary">{selectedEvent.category}</Badge>
              </div>
              <CardDescription className="text-base text-pretty">{selectedEvent.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Date & Time</p>
                      <p className="text-muted-foreground">
                        {new Date(selectedEvent.date).toLocaleDateString()} at {selectedEvent.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">{selectedEvent.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Attendees</p>
                      <p className="text-muted-foreground">
                        {selectedEvent.attendees} of {selectedEvent.maxAttendees} spots filled
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="font-medium mb-2">Event Price</p>
                    <p className="text-2xl font-bold text-primary">{selectedEvent.price}</p>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    size="lg"
                    onClick={() => {
                      handleJoinEvent(selectedEvent.id)
                      setSelectedEvent(null)
                    }}
                  >
                    Join This Event
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
