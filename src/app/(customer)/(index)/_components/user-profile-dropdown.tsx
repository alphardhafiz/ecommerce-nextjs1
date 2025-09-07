/* eslint-disable @next/next/no-img-element */
"use client";
import { User } from "lucia";
import React, { useState, useRef, useEffect } from "react";
import { useFormState } from "react-dom";
import { Logout } from "../lib/actions";
import { ActionResult } from "@/types";

const initialState: ActionResult = {
  error: "",
};

interface UserProfileDropdownProps {
  user: User;
}

export default function UserProfileDropdown({
  user,
}: UserProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [state, formAction] = useFormState(Logout, initialState);

  return (
    <>
      <p className="text-white">Hi, {user.name}</p>
      <div className="relative" ref={dropdownRef}>
        <div
          className="w-[48px] h-[48px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden cursor-pointer hover:border-[#FFC736] transition-all duration-300"
          onClick={toggleDropdown}
        >
          <img
            src="/assets/photos/p4.png"
            className="w-full h-full object-cover rounded-full"
            alt="photo"
          />
        </div>

        {/* Simple Logout Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
            <form action={formAction}>
              <button
                type="submit"
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                Logout
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
