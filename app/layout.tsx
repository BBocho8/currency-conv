import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "Currency Converter",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<body className={inter.className} suppressHydrationWarning={true}>
				<ToastContainer position="top-center" />
				{children}
			</body>
		</html>
	)
}
