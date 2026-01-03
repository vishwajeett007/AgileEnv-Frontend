const WorkPreference = (props: { step: number; handleNext: () => void; }) => {
    const { handleNext } = props;
    const handleSkip = () => {
        handleNext();
    }
    const handleContinue = () => {
        handleNext();
    }
    return (
        <div>
            <div className='flex items-center gap-3 w-full'>
                <button className='bg-transparent text-blue-600 px-5 py-2 rounded-md w-full border border-blue-600' onClick={handleSkip} >Skip</button>
                <button className='bg-blue-600 text-white px-5 py-2 rounded-md w-full' onClick={handleContinue} >Continue</button>
            </div>
        </div>)
}

export default WorkPreference