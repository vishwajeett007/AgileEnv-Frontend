import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full overflow-hidden">
            {/* Left Side - Branding & Illustration */}
            <div className="hidden w-1/2 flex-col justify-between bg-[#DAE9FA] p-10 lg:flex">
                <div className="flex items-center gap-2">
                    <Image
                        src="/Images/logo.svg"
                        alt="Agile Logo"
                        width={40}
                        height={40}
                        className="h-10 w-10"
                    />
                    <h1 className="text-3xl font-bold pb-1 text-[#0057E5]">Agile</h1>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <Image
                        src="/Images/auth left.svg"
                        alt="Team Collaboration"
                        width={500}
                        height={500}
                        className="max-w-md"
                        priority
                    />
                </div>

                <div className="text-center">
                    <p className="text-lg font-medium text-gray-900">
                        Coordinate with your team, share updates, and keep everyone aligned in
                        a space built for clear, connected work.
                    </p>
                </div>
            </div>

            {/* Right Side - Auth Forms */}
            <div className="flex w-full items-center justify-center bg-white p-4 lg:w-1/2 overflow-auto">
                <div className="w-full max-w-md">{children}</div>
            </div>
        </div>
    );
}
