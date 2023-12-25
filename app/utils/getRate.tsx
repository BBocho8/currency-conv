"use server"

import { Request } from "../types/types"

export const getRate = async (request: Request) => {
	const { amount, from, to } = request
	const myHeaders = new Headers()
	myHeaders.append(
		"X-Api-Key",
		process.env.NEXT_PUBLIC_NINJAS_API_KEY as string
	)

	const requestOptions: RequestInit = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	}

	const response = await fetch(
		`https://api.api-ninjas.com/v1/convertcurrency?have=${from}&want=${to}&amount=${amount}`,
		requestOptions
	)
	try {
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
	}
}
