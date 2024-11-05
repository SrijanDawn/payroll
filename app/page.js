import Link from "next/link";
import Image from "next/image";
import Navbar from "./components/Navbar";
import BG from "./components/Payroll BG.jpeg"
import AE from "./components/Add Employee.jpeg"
import ED from "./components/Employee Details.jpeg"
import LR from "./components/Leave Request.jpeg"
import SR from "./components/Salary Reports.jpeg"
import bg from "./components/BackGround.jpg"

export default function Home() {
	return (
		<div className="min-h-screen flex flex-col bg-gray-100" style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover' }}>
			<Navbar />
			<div className="flex flex-col items-center justify-center py-10 px-6">
				<h1 className="text-4xl font-semibold my-10 text-gray-800"></h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
				<Image src={BG} alt="" width={500} height={70} className="rounded border-4 border-white" />
				<div className="border-2 border-white bg-black text-white py-2 px-5">
					<h2 className="text-xl w-full ml-3 mb-2"> ◦ <u>What We Offer</u></h2>
					<p className="text-sm text-justify">
					The Payroll Management Sytem is a cutting-edge platform that revolutionizes employee management. With a focus on efficiency and accuracy, we provide a comprehensive solution for handling employee details, leave management and salary reports. Our user-friendly interface and intuitive design make it easy for businesses of all sizes to navigate and optimize their payroll processes.
				</p></div>
					<Link href="/employee">
							<div className="flex justify-center items-center p-3 border-2 border-black text-center rounded-lg shadow-lg bg-white hover:bg-blue-100">
								<Image src={AE} alt="" width={50} height={50} className="rounded-full mr-5" />
								<h2 className="text-2xl font-semibold text-blue-700">Add Employee</h2>
							</div>
					</Link>
					<Link href="/details">
							<div className="flex justify-center items-center p-3 border-2 border-black text-center rounded-lg shadow-lg bg-white hover:bg-blue-100">
								<Image src={ED} alt="" width={50} height={50} className="rounded-full mr-5" />
								<h2 className="text-2xl font-semibold text-blue-700">Employee Details</h2>
							</div>
					</Link>
					<Link href="/leave">
							<div className="flex justify-center items-center p-3 border-2 border-black text-center rounded-lg shadow-lg bg-white hover:bg-blue-100">
								<Image src={LR} alt="" width={50} height={50} className="rounded-full mr-5" />
								<h2 className="text-2xl font-semibold text-blue-700">Leave Request</h2>
							</div>
					</Link>
					<Link href="/salary">
							<div className="flex justify-center items-center p-3 border-2 border-black text-center rounded-lg shadow-lg bg-white hover:bg-blue-100">
								<Image src={SR} alt="" width={50} height={50} className="rounded-full mr-5" />
								<h2 className="text-2xl font-semibold text-blue-700">Salary Reports</h2>
							</div>
					</Link>
				</div>
			</div>
		</div>
	);
}