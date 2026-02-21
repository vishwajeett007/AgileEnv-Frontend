import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setFullName, setProfileWorkRole } from "@/lib/features/onboarding/onboarding-Slice";
import { ProfileNameSchema, RoleSelectionSchema } from "../../schemas";
import { toast } from "sonner";
const ProfileDetails = (props: { step: number; handleNext: () => void; }) => {
    const { handleNext } = props;
    const dispatch = useAppDispatch();
    const {fullname, profileWorkRole} = useAppSelector((state) => state.onboarding);

    const work = [
        "Project Manager",
        "O/A Tester",
        "Senior Manager",
        "Operations",
        "Developer",
        "UI/UX Designer",
        "Product Designer",
        "Other",
    ]

    const handleSkip = () => {
        dispatch(setFullName(""));
        dispatch(setProfileWorkRole(""));
        handleNext();
    }

    const handleContinue = () => {
        const nameValidation = ProfileNameSchema.safeParse({ name: fullname });
        const roleValidation = RoleSelectionSchema.safeParse({ role: profileWorkRole });
        if(!nameValidation.success){
            toast.error(nameValidation.error.issues[0].message);
            return;
        }
        if(!roleValidation.success){
            toast.error(roleValidation.error.issues[0].message);
            return;
        }
        handleNext();
    }
    // console.log(fullname);
    return (
        <div className='w-full flex flex-col items-center gap-8 px-5 sm:px-10 lg:px-30 xl:px-55'>

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
                    value={fullname}
                    onChange={(e) => dispatch(setFullName(e.target.value))}
                    placeholder="Enter your full name"
                    className="w-full rounded-md p-3 bg-gray-100"
                />
            </div>

            {/* what describe your work */}
            <div className='flex flex-col gap-4 w-full'>
                <h1 className="text-xl font-medium text-gray-900 text-left">What describe your work?</h1>
                <div className='grid grid-rows-3 grid-flow-col gap-3'>
                    {work.map((item, index) => {
                        return (
                            <button 
                            key={index} 
                            className={`rounded-md p-3 border-2 transition-all duration-300 ease-out cursor-pointer active:scale-95 ${
                                profileWorkRole === item 
                                    ? "border-green-500 bg-green-50 scale-105 shadow-[5px_3px_4px_rgba(0,0,0,0.4)]" 
                                    : "border-gray-400 hover:border-blue-400 hover:bg-blue-50 hover:scale-105 hover:shadow-md"
                            }`} 
                            onClick={() => dispatch(setProfileWorkRole(profileWorkRole === item ? "" : item))}>
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