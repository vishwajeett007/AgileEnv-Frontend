import Image from "next/image";
import ProfilePhoto from "./Profile-steps/profile-photo";
// import PersonalDetails from "./Profile-steps/personal-details";
// import WorkPreferences from "./Profile-steps/work-preferences";

const ProfileSetup = () => {

    return (
        <div className="w-full grid grid-cols-1 sm:grid-cols-[35vw_1fr] lg:grid-cols-[30vw_1fr] xl:grid-cols-[28vw_1fr] min-h-screen">

            <div className="hidden sm:flex flex-col items-center justify-center bg-[#D9E5F7] col-span-1 p-10 lg:pl-15 lg:pt-15">

                <div className="flex items-center gap-3">
                    <Image
                        src="/Images/logo.svg"
                        alt="logo"
                        width={40}
                        height={40}
                    />
                    <p className="text-3xl font-semibold text-blue-700">Agile</p>
                </div>

                <div className="flex items-center gap-4 mt-10">
                    <div className="rounded-full border border-3 border-blue-400 bg-white w-10 h-10 lg:w-12 lg:h-12 text-blue-700 flex items-center justify-center">1</div>
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-600">Step 1</p>
                        <h1 className="text-md md:text-xl lg:text-2xl font-medium">Profile Photo</h1>
                    </div>
                </div>

                <div className="h-10 w-1 bg-blue-300/60 ml-5 rounded-lg"></div>

                <div className="flex items-center gap-4">
                    <div className="rounded-full border border-3 border-blue-400 bg-white w-10 h-10 lg:w-12 lg:h-12 text-blue-700 flex items-center justify-center">2</div>
                    <div className="flex flex-col">
                        <p className="text-md fon-medium text-gray-600">Step 2</p>
                        <h1 className="text-md md:text-xl lg:text-2xl font-medium">Personal Details</h1>
                    </div>
                </div>

                <div className="h-10 w-1 bg-blue-300/60 ml-5 rounded-lg"></div>

                <div className="flex items-center gap-4">
                    <div className="rounded-full border border-3 border-blue-400 bg-white w-10 h-10 lg:w-12 lg:h-12 text-blue-700 flex items-center justify-center">3</div>
                    <div className="flex flex-col">
                        <p className="text-md font-medium text-gray-600">Step 3</p>
                        <h1 className="text-md md:text-xl lg:text-2xl font-medium">Work Preferences</h1>
                    </div>
                </div>

            </div>

            <div className="col-span-1 flex flex-col items-center justify-center w-full h-full">
                <ProfilePhoto />
            </div>

        </div>
    )
}

export default ProfileSetup;