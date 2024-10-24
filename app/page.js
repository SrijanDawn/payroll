import Link from "next/link";
export default function Home() {
	return (
		<>
			<Link href="/employee">Add Employee</Link><br />
			<Link href="/details">View Employee Details</Link><br />
			<Link href="/leave">Issue Leave Request</Link><br />
			<Link href="/salary">Salary Reports</Link><br />
		</>
	)}
// address, gender
// yellow bg, blue bg in table, 