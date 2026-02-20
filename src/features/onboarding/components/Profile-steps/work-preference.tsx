import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { resetOnboarding, setWorkPreferences } from "@/lib/features/onboarding/onboarding-Slice";
import { useRouter } from "next/navigation";
import { useAuthFetch } from "@/hooks/use-auth-fetch";

const WorkPreference = () => {

    const  authFetch  = useAuthFetch();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {workPreferences, profileWorkRole , fullname, profileImage} = useAppSelector((state) => state.onboarding);
    
    const work = [
        "Plan and manage sprints",
        "Team Collaborate",
        "Track tasks and issues",
        "Reports and insights",
        "Bug tracking",
        "Roadmap planning",
    ]
    const formData = new FormData();
    formData.append("name", fullname);
    if (profileImage) {
        formData.append("image", profileImage);
    }
    formData.append("post", profileWorkRole);
    formData.append("reason", JSON.stringify(workPreferences));

    const handleSkip = () => {
        handleContinue();
    }

    const handleContinue = async () => {
        try {
            const response = await authFetch("profile/" , {
                method : "POST",
                body : formData
            });
            const data = await response.json();
            console.log("Profile saved successfully", data);
            dispatch(resetOnboarding());
            router.push("/dashboard");
        } catch (error) {            
            console.error("Failed to save profile data", error);
        }
    }

    return (
        <div className='w-full flex flex-col items-center justify-start gap-8 px-5 sm:mt-20 sm:px-10 lg:px-30 xl:px-40'>

            <div className='flex flex-col items-center gap-2 mb-1'>
                <h1 className='text-3xl xl:text-4xl font-medium text-gray-900 text-center'>What Brings you here?</h1>
                <p className='text-gray-800 text-center text-base xl:text-lg'>Choose what you plan to use this platform for.</p>
            </div>

            {/* what describe your work */}
            <div className='flex flex-col gap-4 w-full'>
                <h1 className="text-xl font-medium text-gray-900 text-left">What describe your work?</h1>
                <div className='grid grid-rows-3 grid-flow-col gap-3'>
                    {work.map((item, index) => {
                        return (
                            <button 
                            key={index} 
                            className={`rounded-md p-3 mx-2 border-2 transition-all duration-300 ease-out cursor-pointer active:scale-95 ${
                                workPreferences.includes(item) 
                                    ? "border-green-500 bg-green-50 scale-105 shadow-[5px_3px_4px_rgba(0,0,0,0.4)]" 
                                    : "border-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:scale-105 hover:shadow-md"
                            }`}
                            onClick={() => {
                                const updatedPreferences = workPreferences.includes(item) 
                                    ? workPreferences.filter((i) => i !== item) 
                                    : [...workPreferences, item];
                                dispatch(setWorkPreferences(updatedPreferences));
                            }}>
                                {item}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className='flex items-center gap-3 w-full'>
                <button className='bg-transparent text-blue-600 px-5 py-2 rounded-md w-full border border-blue-600 border-2' onClick={handleSkip} >Skip</button>
                <button className='bg-blue-600 text-white px-5 py-2 rounded-md w-full' onClick={handleContinue} >Finish</button>
            </div>
        </div>)
}

export default WorkPreference