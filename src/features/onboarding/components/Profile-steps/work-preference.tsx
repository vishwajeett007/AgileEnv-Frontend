const WorkPreference = (props: { step: number; handleNext: () => void; }) => {
    const work = [
        "Plan and manage sprints",
        "Team Collaborate",
        "Track tasks and issues",
        "Reports and insights",
        "Bug tracking",
        "Roadmap planning",
    ]

    const { handleNext } = props;
    const handleSkip = () => {
        handleNext();
    }
    const handleContinue = () => {
        handleNext();
    }

    return (
        <div className='w-full flex flex-col items-center justify-start gap-8 px-5 sm:mt-20 sm:px-10 lg:px-30 xl:px-50'>

            <div className='flex flex-col items-center gap-2 mb-1'>
                <h1 className='text-3xl xl:text-4xl font-medium text-gray-900 text-center'>What Brings you here?</h1>
                <p className='text-gray-800 text-center text-base xl:text-lg'>Choose what you plan to use this platform for.</p>
            </div>

            {/* what describe your work */}
            <div className='flex flex-col gap-4 w-full'>
                <h1 className="text-xl font-medium text-gray-900 text-left">What describe your work?</h1>
                <div className='grid grid-rows-2 grid-flow-col gap-2'>
                    {work.map((item, index) => {
                        return (
                            <button key={index} className="rounded-md p-3 border border-gray-300 border-2">
                                {item}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='flex items-center gap-3 w-full'>
                <button className='bg-transparent text-blue-600 px-5 py-2 rounded-md w-full border border-blue-600 border-2' onClick={handleSkip} >Skip</button>
                <button className='bg-blue-600 text-white px-5 py-2 rounded-md w-full' onClick={handleContinue} >Continue</button>
            </div>
        </div>)
}

export default WorkPreference