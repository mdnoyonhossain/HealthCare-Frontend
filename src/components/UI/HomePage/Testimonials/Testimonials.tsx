"use client";
import React from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ReusableUI/carousel";
import { Card, CardContent } from "@/components/ReusableUI/card";
import SkeletonLoading from "@/components/Loading/SkeletonLoading";
import { Rating } from "@mui/material";
import { useGetAllReviewsQuery } from "@/redux/api/reviewApi";

const Testimonials = () => {
    const { data: getAllReviews, isLoading, isError } = useGetAllReviewsQuery({});

    if (isLoading) {
        return <SkeletonLoading />;
    }

    if (isError) {
        return (
            <div className="text-center text-red-500 py-10">
                Failed to load testimonials. Please try again later.
            </div>
        );
    }

    if (!getAllReviews?.reviews?.length) {
        return (
            <div className="text-center text-gray-500 py-10">
                No testimonials available at the moment.
            </div>
        );
    }

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
                        {getAllReviews?.reviews?.map((testimonial: any) => (
                            <CarouselItem
                                key={testimonial?.id}
                                className="pl-4 basis-full sm:basis-full md:basis-1/2 lg:basis-1/3"
                            >
                                <Card className="bg-white border border-gray-100 h-full shadow-sm hover:shadow-md transition-shadow">
                                    <CardContent className="p-6 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{testimonial?.patient?.name}</h3>
                                                <p className="text-sm text-gray-500">{testimonial?.date}</p>
                                            </div>
                                            <Rating name="half-rating-read" defaultValue={testimonial?.rating} precision={0.5} readOnly />
                                        </div>
                                        <p className="text-gray-600 italic flex-grow">{testimonial?.comment}</p>
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