import React from 'react'

function Workspace() {
  return (
    <div className='flex justify-center items-center'>
      <div className='w-full max-w-6xl h-[calc(100vh-61px)] flex justify-around gap-2 p-5'>
        <div className='flex flex-col max-w-4xl'>
            <div className='pb-10'>
            <ul className='flex font-bold list-none gap-5 pb-3 border-b'>
                <li>Dashboard</li> 
                <li>My Issues</li>
                <li>Projects</li>
                <li>Views</li>
            </ul>
            </div>

            <h2 className='text-xl font-bold'>Recent Projects</h2>
            <div className='flex p-4 gap-8'>
                   <div className=''>
                    <div>
                        
                    </div>
                    <h2>Mobile App Rebrand</h2>
                    <p>Phase: UI Implementation and asset delivery.</p>
                    <div>
                        IN PROGRESS
                    </div>
                   
                </div>
                <div className=''>
                    <div>
                        
                    </div>
                    <h2>Mobile App Rebrand</h2>
                    <p>Phase: UI Implementation and asset delivery.</p>
                    <div>
                        IN PROGRESS
                    </div>
                   
                </div>
                <div className=''>
                    <div>
                        
                    </div>
                    <h2>Mobile App Rebrand</h2>
                    <p>Phase: UI Implementation and asset delivery.</p>
                    <div>
                        IN PROGRESS
                    </div>
                   
                </div>
            </div>


            <h2 className='text-xl font-bold'>Assigned to Me</h2>
            <div className=''>

            </div>
        </div>
        <div className='w-full max-w-75 border'>
            <h1 className='text-xl font-bold'>Activity</h1>
        </div>
    </div>
    </div>
  )
}

export default Workspace