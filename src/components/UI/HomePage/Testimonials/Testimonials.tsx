"use client";
import React from "react";
import { Star } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ReusableUI/carousel";
import { Card, CardContent } from "@/components/ReusableUI/card";

const testimonials = [
    {
        name: "Jennifer K.",
        date: "May 15, 2024",
        rating: 5,
        content:
            "The doctors here are incredibly professional and caring. I've never felt more comfortable discussing my health concerns.",
    },
    {
        name: "Robert T.",
        date: "April 3, 2024",
        rating: 5,
        content:
            "From the moment I walked in, the staff made me feel welcome. My treatment plan was well explained and effective.",
    },
    {
        name: "Lisa M.",
        date: "March 22, 2024",
        rating: 5,
        content:
            "I've been bringing my family here for years. The pediatric care is exceptional and my children actually look forward to their check-ups!",
    },
    {
        name: "Michael B.",
        date: "February 18, 2024",
        rating: 5,
        content:
            "The new online booking system is fantastic. I was able to schedule my appointment and receive prompt care when I needed it most.",
    },
    {
        name: "Sarah P.",
        date: "January 9, 2024",
        rating: 5,
        content:
            "After struggling with my condition for years, the specialists here finally helped me find relief. I'm forever grateful for their expertise.",
    },
];

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    className={`w-5 h-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                        }`}
                />
            ))}
        </div>
    );
};

const Testimonials = () => {
    return (
        <section className="bg-[#EFF6FF] px-4 py-10 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900">Patient Testimonials</h2>
                    <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
                        Hear what our patients say about their experience with our healthcare services.
                    </p>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        skipSnaps: false,
                    }}
                    className="max-w-6xl mx-auto"
                >
                    <CarouselContent className="-ml-4">
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem
                                key={index}
                                className="pl-4 basis-full sm:basis-full md:basis-1/2 lg:basis-1/3"
                            >
                                <Card className="bg-white border border-gray-100 h-full shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                                                <p className="text-sm text-gray-500">{testimonial.date}</p>
                                            </div>
                                            <StarRating rating={testimonial.rating} />
                                        </div>
                                        <p className="text-gray-600 italic flex-grow">{testimonial.content}</p>
                                    </CardContent>
                                </Card>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="flex justify-center mt-8">
                        <CarouselPrevious className="-left-0 relative mx-2 cursor-pointer" />
                        <CarouselNext className="-right-0 relative mx-2 cursor-pointer" />
                    </div>
                </Carousel>
            </div>
        </section>
    );
};

export default Testimonials;
