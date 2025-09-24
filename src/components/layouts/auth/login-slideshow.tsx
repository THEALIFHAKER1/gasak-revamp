"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { useBrand } from "@/components/providers/brand-provider";

const slides = [
  {
    quote:
      "This platform has revolutionized how we manage our esports organization and track team performance across all our tournaments.",
    author: "Team Captain",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80",
    title: "Tournament Management",
  },
  {
    quote:
      "The analytics and reporting features have given us incredible insights into our players' performance and team dynamics.",
    author: "Esports Manager",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80",
    title: "Performance Analytics",
  },
  {
    quote:
      "Managing multiple teams and tournaments has never been easier. This tool is a game-changer for competitive gaming.",
    author: "Tournament Director",
    image:
      "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80",
    title: "Team Management",
  },
  {
    quote:
      "The real-time collaboration features help our coaching staff work together seamlessly across different time zones.",
    author: "Head Coach",
    image:
      "https://images.unsplash.com/photo-1486572788966-cfd3df1f5b42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&h=1200&q=80",
    title: "Global Collaboration",
  },
];

export default function LoginSlideshow() {
  const { brand, getAssetUrl } = useBrand();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    // Auto-scroll functionality
    const startAutoplay = () => {
      autoplayRef.current = setInterval(() => {
        if (api) {
          api.scrollNext();
        }
      }, 5000);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };

    startAutoplay();

    // Pause autoplay on hover
    const carousel = api.containerNode();
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);

    return () => {
      stopAutoplay();
      carousel.removeEventListener("mouseenter", stopAutoplay);
      carousel.removeEventListener("mouseleave", startAutoplay);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="bg-muted laptop:flex relative hidden h-full flex-col overflow-hidden text-white dark:border-r">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="absolute inset-0"
      >
        <CarouselContent className="ml-0 h-full">
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="h-full pl-0">
              <div className="relative h-screen">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="relative z-20 flex items-center p-10 pb-0">
        <div className="bg-background/40 flex items-center space-x-3 rounded-xl p-2">
          <div className="text-primary-foreground flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg">
            <Image
              src={getAssetUrl("logo")}
              alt={brand.metadata.name}
              width={50}
              height={50}
            />
          </div>
          <div className="grid flex-1 overflow-hidden text-left leading-tight">
            <span className="truncate overflow-hidden text-xl font-bold tracking-wide whitespace-nowrap text-white">
              {brand.metadata.name}
            </span>
            <span className="truncate overflow-hidden text-sm whitespace-nowrap text-white/70">
              {brand.metadata.tagline}
            </span>
          </div>
        </div>
      </div>

      <div className="relative z-20 flex flex-1 flex-col justify-between px-10">
        <div className="mt-4">
          <h2 className="mb-2 text-3xl font-bold">{slides[current]?.title}</h2>
          <div className="bg-primary/60 h-1 w-16 rounded"></div>
        </div>

        <div className="space-y-6">
          <blockquote className="space-y-4">
            <p className="text-xl leading-relaxed font-light">
              &ldquo;{slides[current]?.quote}&rdquo;
            </p>
            <footer className="text-base font-medium opacity-90">
              {slides[current]?.author}
            </footer>
          </blockquote>

          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    "hover:bg-primary h-1 rounded-full transition-all duration-300",
                    current === index ? "bg-primary w-12" : "w-6 bg-white/40",
                  )}
                  onClick={() => api?.scrollTo(index)}
                />
              ))}
            </div>
            <div className="flex space-x-3 pb-10">
              <Button
                onClick={() => api?.scrollPrev()}
                className="hover:bg-primary hover:text-primary-foreground rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors"
              >
                <IconChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => api?.scrollNext()}
                className="hover:bg-primary hover:text-primary-foreground rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors"
              >
                <IconChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
