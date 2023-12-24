import { CurrencyListItem } from "../types/types"

const supportedCurr = [
	"USD",
	"EUR",
	"CNY",
	"CHF",
	"AUD",
	"PLN",
	"TRY",
	"CAD",
	"JPY",
	"GBP",
	"NZD",
	"KRW",
	"DKK",
	"HKD",
]

export const getSupportedCurrencies = async () => {
	const response = await fetch("https://sge-db.sge-db.workers.dev/currencies")
	const data = await response.json()
	const supportedCurrencies = data.currencies.filter((res: CurrencyListItem) =>
		supportedCurr.includes(res.currency)
	)

	return supportedCurrencies
}
