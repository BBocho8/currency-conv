import { useState } from "react"
import { CurrencyListItem, Request } from "./types/types"
import { getSupportedCurrencies } from "./utils/getSupportedCurrencies"
import SwapButton from "./components/SwapButton"
import LandingPage from "./components/LandingPage"

export default async function Home() {
	const supportedCurrencies: CurrencyListItem[] = await getSupportedCurrencies()

	return (
		<>
			<LandingPage supportedCurrencies={supportedCurrencies} />
		</>
	)
}
