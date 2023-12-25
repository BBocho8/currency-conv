import { CurrencyListItem, handleSwapProps } from "../types/types"
import { getRate } from "./getRate"

const handleQuerySwap = (
	setQueryFrom: React.Dispatch<React.SetStateAction<string>>,
	setQueryTo: React.Dispatch<React.SetStateAction<string>>,
	setFromCurr: React.Dispatch<React.SetStateAction<CurrencyListItem>>,
	setToCurr: React.Dispatch<React.SetStateAction<CurrencyListItem>>,
	fromCurr: CurrencyListItem,
	toCurr: CurrencyListItem
) => {
	setQueryFrom(
		toCurr.currency ? `${toCurr.currency} - ${toCurr.description}` : ""
	)
	setQueryTo(
		fromCurr.currency ? `${fromCurr.currency} - ${fromCurr.description}` : ""
	)

	setFromCurr({
		currency: toCurr.currency,
		description: toCurr.description,
	})
	setToCurr({
		currency: fromCurr.currency,
		description: fromCurr.description,
	})
}

export const handleSwap = async ({
	request,
	setRequest,
	setQueryFrom,
	setQueryTo,
	setFromCurr,
	setToCurr,
	fromCurr,
	toCurr,
	setRate,
}: handleSwapProps) => {
	if (request.from && request.to) {
		setRequest({ ...request, from: request.to, to: request.from })
		handleQuerySwap(
			setQueryFrom,
			setQueryTo,
			setFromCurr,
			setToCurr,
			fromCurr,
			toCurr
		)
	} else if (request.from && !request.to) {
		setRequest({ ...request, from: "", to: request.from })
		handleQuerySwap(
			setQueryFrom,
			setQueryTo,
			setFromCurr,
			setToCurr,
			fromCurr,
			toCurr
		)
	} else if (!request.from && request.to) {
		setRequest({ ...request, from: request.to, to: "" })
		handleQuerySwap(
			setQueryFrom,
			setQueryTo,
			setFromCurr,
			setToCurr,
			fromCurr,
			toCurr
		)
	}

	const data = await getRate(request)

	setRate(
		parseFloat(
			parseFloat((data.new_amount / data.old_amount).toString()).toFixed(2)
		)
	)
}
