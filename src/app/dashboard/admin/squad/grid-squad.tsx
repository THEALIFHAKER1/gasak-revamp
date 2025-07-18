"use client";

import Image from "next/image";
import { Icons } from "@/components/icons";
import { Pagination } from "@/components/ui/pagination";
const squads = [
  {
    id: 1,
    name: "Alpha Strike",
    logo: "https://i.pravatar.cc/80?img=1",
    leader: "Commander Rex",
    memberCount: 12,
    backgroundImage: "https://picsum.photos/400/300?random=1",
  },
  {
    id: 2,
    name: "Shadow Wolves",
    logo: "https://i.pravatar.cc/80?img=2",
    leader: "Captain Luna",
    memberCount: 8,
    backgroundImage: "https://picsum.photos/400/300?random=2",
  },
  {
    id: 3,
    name: "Phoenix Rising",
    logo: "https://i.pravatar.cc/80?img=3",
    leader: "Major Blaze",
    memberCount: 15,
    backgroundImage: "https://picsum.photos/400/300?random=3",
  },
  {
    id: 4,
    name: "Iron Eagles",
    logo: "https://i.pravatar.cc/80?img=4",
    leader: "Colonel Steel",
    memberCount: 10,
    backgroundImage: "https://picsum.photos/400/300?random=4",
  },
  {
    id: 5,
    name: "Storm Breakers",
    logo: "https://i.pravatar.cc/80?img=5",
    leader: "Lieutenant Thunder",
    memberCount: 9,
    backgroundImage: "https://picsum.photos/400/300?random=5",
  },
  {
    id: 6,
    name: "Viper Squad",
    logo: "https://i.pravatar.cc/80?img=6",
    leader: "Sergeant Venom",
    memberCount: 7,
    backgroundImage: "https://picsum.photos/400/300?random=6",
  },
];

export default function GridSquad() {
  return (
    <div className="space-y-2">
      <div className="tablet:grid-cols-2 laptop:grid-cols-4 grid grid-cols-1 gap-2">
        {squads.map((squad) => (
          <div
            key={squad.id}
            className="tablet:h-80 relative h-46 overflow-hidden rounded-xl shadow-lg"
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={squad.backgroundImage}
                alt={`${squad.name} background`}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Content */}
            <div className="relative flex h-full flex-col justify-between p-6">
              {/* Squad Logo - Top Right */}
              <div className="flex justify-end">
                <div className="tablet:p-3 rounded-full bg-white/20 p-1.5 backdrop-blur-sm">
                  <Image
                    src={squad.logo || "/placeholder.svg"}
                    alt={`${squad.name} logo`}
                    width={40}
                    height={40}
                    className="tablet:w-20 tablet:h-20 h-10 w-10 rounded-full"
                  />
                </div>
              </div>

              {/* Squad Info - Bottom */}
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-white">{squad.name}</h2>

                <div className="flex items-center space-x-2 text-gray-200">
                  {/* Use Icons.crown if available, else fallback emoji */}
                  <Icons.crown className="h-4 w-4" />
                  <span className="text-xs font-medium">{squad.leader}</span>
                </div>

                <div className="flex items-center space-x-2 text-gray-200">
                  <Icons.users className="h-4 w-4" />
                  <span className="text-xs font-medium">
                    {squad.memberCount}{" "}
                    {squad.memberCount === 1 ? "Member" : "Members"}
                  </span>
                </div>
              </div>
            </div>

            {/* Card Border */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent" />
          </div>
        ))}
      </div>
      <Pagination />
    </div>
  );
}
