export type CurrencyListItem = {
	currency: string
	description: string
}

export type Request = {
	amount: number
	from: string
	to: string
}

export interface handleSwapProps {
	request: Request
	setRequest: React.Dispatch<React.SetStateAction<Request>>
	setQueryFrom: React.Dispatch<React.SetStateAction<string>>
	setQueryTo: React.Dispatch<React.SetStateAction<string>>
	setFromCurr: React.Dispatch<React.SetStateAction<CurrencyListItem>>
	setToCurr: React.Dispatch<React.SetStateAction<CurrencyListItem>>
	fromCurr: CurrencyListItem
	toCurr: CurrencyListItem
	setRate: React.Dispatch<React.SetStateAction<number>>
}
