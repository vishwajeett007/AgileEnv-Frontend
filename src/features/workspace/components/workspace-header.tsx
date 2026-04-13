import React from 'react'
import { Bell, Search } from 'lucide-react';

function WorkspaceHeader() {
  return (
    <div className='left flex items-center justify-between border-b px-3 pt-2 pb-3'>
        <h1 className="text-2xl font-bold font-Sans">Workspace</h1>
        <div className='relative w-full max-w-lg'>
            <Search className='hidden sm:block absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500' />
            <input type="text" placeholder="Search..." className='max-w-lg w-full hidden sm:block p-1 border-2 rounded-sm pl-10'/>
        </div>
        <div className='right flex items-center gap-4'>
        <Bell />
        <div className='w-10 h-10 rounded-full bg-blue-200 text-black flex items-center justify-center font-bold'>P</div>
        </div>
        
    </div>
  )
}

export default WorkspaceHeader;