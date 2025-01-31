import React from 'react'

const Topbar = () => {
  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-zinc-950/80 dark:border-zinc-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors duration-300">
          Actionable Jobs
        </h1>
        <nav>
          <ul className="flex space-x-8">
            <li>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Jobs
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className="text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-emerald-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                Companies
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}




export default Topbar