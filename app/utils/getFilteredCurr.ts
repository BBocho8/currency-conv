import { CurrencyListItem } from "../types/types"

export const getFilteredItems = (query: string, arr: CurrencyListItem[]) => {
	if (!query) {
		return arr
	}
	if (query.length) {
		return arr.filter(
			(curr) =>
				curr.currency.toLowerCase().includes(query.toLowerCase()) ||
				curr.description.toLowerCase().includes(query.toLowerCase()) ||
				(
					curr.currency.toLowerCase() +
					" - " +
					curr.description.toLowerCase()
				).includes(query.toLowerCase())
		)
	}
}
