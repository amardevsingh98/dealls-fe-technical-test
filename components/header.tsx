import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { useState } from 'react'
import SideBar from "./side-bar"
import UserAvatar from "./user-avatar"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const sideBarClass = 'fixed top-0 left-0 bottom-0 w-64 bg-blue-950 text-white transition-all duration-300 ease-in-out z-10'

  return (
    <div>
      <header>
        <nav className="flex flex-row justify-between items-center p-4 fixed top-0 left-0 right-0 border-b-2 z-10 bg-white">
          <div className="flex items-center">
            <UserAvatar 
              image="https://robohash.org/hicveldicta.png?size=50x50&set=set1"
              fullName="Terry Medhurst"
              email="atuny0@sohu.com"
            />
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {
              !isMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 0 9 L 0 11 L 50 11 L 50 9 Z M 0 24 L 0 26 L 50 26 L 50 24 Z M 0 39 L 0 41 L 50 41 L 50 39 Z" fill="currentColor"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
                  <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" fill="currentColor"></path>
                </svg>
              )
            } 
          </button>
        </nav>
      </header>

      <SideBar 
        className={ isMenuOpen ? sideBarClass : `${sideBarClass} -translate-x-full` }
        onButtonNavClick={() => setIsMenuOpen(false)}
      />
    </div>
  )
}
