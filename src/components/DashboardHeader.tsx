import { userType } from "@/auth";
import Image from "next/image";
import React from "react";

interface UserProps {
  user: userType;
}

const DashboardHeader = ({ user }: UserProps) => {
  if (!user) return null;
  const { email, name, image, role } = user;
  return (
    <div className="text-sm leading-6">
      <figure className="relative flex flex-col-reverse bg-slate-100 rounded-lg p-6 dark:bg-slate-800 dark:highlight-white/5">
        <figcaption className="flex items-center space-x-4">
          <Image
            src={image || ""}
            alt={`${name}'s profile picture`}
            className="flex-none w-14 h-14 rounded-full object-cover"
            loading="lazy"
            decoding="async"
            width={56}
            height={56}
          />
          <div className="flex-auto">
            <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
              {name || "Anonymous"}
            </div>
            <div className="text-base text-slate-900 font-semibold dark:text-slate-200">
              {email || "abc@xyz"}
            </div>
            <div className="mt-0.5 dark:text-slate-300">{role || "N/A"}</div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default DashboardHeader;
