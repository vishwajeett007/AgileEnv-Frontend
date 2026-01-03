
const ProfileDetails = (props: { step: number; handleNext: () => void; }) => {
    const { handleNext } = props;

    const work = [
        "Project Manager",
        "O/A Tester",
        "Developer",
        "Operations",
        "Developer",
        "Designer",
        "Designer",
        "Other",
    ]

    const handleSkip = () => {
        handleNext();
    }

    const handleContinue = () => {
        handleNext();
    }

    return (
        <div className='w-full flex flex-col items-center gap-8 px-5 sm:px-10 lg:px-30 xl:px-50'>

            <div className='flex flex-col items-center gap-2 mb-1'>
                <h1 className='text-3xl xl:text-4xl font-medium text-gray-900 text-center'>Personal Details</h1>
                <p className='text-gray-800 text-center text-base xl:text-lg'>You can update everything later from your Profile settings</p>
            </div>

            {/* name field */}
            <div className='flex flex-col items-left gap-3 w-full mb-1 sm:mb-4'>
                <label htmlFor="name"
                    className="text-xl font-medium text-gray-900 text-left">
                    Full Name
                </label>
                <input type="text"
                    id="name"
                    placeholder="Enter your full name"
                    className="w-full rounded-md p-3 bg-gray-100"
                />
            </div>

            {/* what describe your work */}
            <div className='flex flex-col gap-4 w-full'>
                <h1 className="text-xl font-medium text-gray-900 text-left">What describe your work?</h1>
                <div className='grid grid-rows-3 grid-flow-col gap-2'>
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
        </div>
    )
}

export default ProfileDetails