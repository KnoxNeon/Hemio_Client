import React from 'react'
import { Outlet } from 'react-router'
import Aside from '../Components/Aside/Aside'

const DashboardLayout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Aside />
      <div className='lg:ml-64'>
        <main className='p-6 lg:p-8 min-h-screen'>
          <div className='max-w-7xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
