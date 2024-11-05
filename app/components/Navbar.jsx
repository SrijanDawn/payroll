"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "./Payroll Management System logo.png"
import profile from "./profile icon.jpg"
import dashed from "./3 dashed lines.jpg"
import { Nerko_One, Sorts_Mill_Goudy } from "next/font/google"

const nerko = Nerko_One({
	subsets: ['latin'],
	weight: '400',
})
const sorts = Sorts_Mill_Goudy({
	subsets: ['latin'],
	weight: '400',
})

const Navbar = () => {
	return (
		<nav className="bg-blue-600 shadow-md">
			<div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
				<Link href="/">
					<Image src={logo} alt="" width={70} height={70} className="rounded-full" />
				</Link>

				<div className="flex-1 text-center">
					<h1 className={"text-6xl  text-white " + sorts.className}>Payroll Management System</h1>
				</div>

				<div className="flex items-center space-x-4 text-white">
					<Image src={profile} alt="" width={40} height={40} className="rounded-full" />
					<Image src={dashed} alt="" width={40} height={40} className="rounded-full" />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
