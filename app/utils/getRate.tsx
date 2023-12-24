"use server"

import { Request } from "../types/types"

export const getRate = async (request: Request) => {
	const { amount, from, to } = request
	const myHeaders = new Headers()
	myHeaders.append("X-Api-Key", "ZKVUwBYUzfz996hCo+77yQ==n56TzPTSmwfIriFJ")

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	}

	const response = await fetch(
		`https://api.api-ninjas.com/v1/convertcurrency?have=${from}&want=${to}&amount=${amount}`,
		requestOptions
	)
	const data = await response.json()

	return data
}
