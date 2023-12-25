import { CurrencyListItem } from "./types/types"
import { getSupportedCurrencies } from "./utils/getSupportedCurrencies"
import LandingPage from "./components/LandingPage"

export default async function Home() {
	const supportedCurrencies: CurrencyListItem[] = await getSupportedCurrencies()

	return (
		<>
			<LandingPage supportedCurrencies={supportedCurrencies} />
		</>
	)
}
