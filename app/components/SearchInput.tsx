import { useEffect, useRef, useState } from "react"
import { FaChevronDown } from "react-icons/fa6"
import { FaX } from "react-icons/fa6"
import "/node_modules/currency-flags/dist/currency-flags.min.css"
import { useOnClickOutside } from "usehooks-ts"
import { CurrencyListItem, Request } from "../types/types"
import { getFilteredItems } from "../utils/getFilteredCurr"

type SearchInputProps = {
	fromOrTo: "from" | "to"
	currencyList: CurrencyListItem[]
	setRequest: React.Dispatch<React.SetStateAction<Request>>
	request: Request
	queryFrom?: string
	queryTo?: string
	setQueryFrom?: React.Dispatch<React.SetStateAction<string>>
	setQueryTo?: React.Dispatch<React.SetStateAction<string>>
	setFromCurr?: React.Dispatch<React.SetStateAction<CurrencyListItem>>
	setToCurr?: React.Dispatch<React.SetStateAction<CurrencyListItem>>
}

export default function SearchInput({
	currencyList,
	setRequest,
	request,
	fromOrTo,
	queryTo,
	queryFrom,
	setQueryFrom,
	setQueryTo,
	setFromCurr,
	setToCurr,
}: SearchInputProps) {
	const [isOpen, setIsOpen] = useState(false)
	const ref = useRef(null)

	const [filteredItems, setFilteredItems] = useState<
		CurrencyListItem[] | undefined
	>()

	const handleClickOutside = () => {
		setIsOpen(false)
	}

	useOnClickOutside(ref, handleClickOutside)

	const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (fromOrTo === "from") {
			setQueryFrom!(e.target.value)
		} else if (fromOrTo === "to") {
			setQueryTo!(e.target.value)
		}
	}

	useEffect(() => {
		if (fromOrTo === "from") {
			setFilteredItems(getFilteredItems(queryFrom!, currencyList))
		} else if (fromOrTo === "to") {
			setFilteredItems(getFilteredItems(queryTo!, currencyList))
		}
	}, [queryFrom, queryTo, currencyList, fromOrTo])

	const displayedCurrency = (arr: CurrencyListItem[]) => {
		return arr.map((curr) => {
			return (
				<li
					onClick={() => handleClick(curr)}
					key={curr.currency}
					className="flex items-center justify-start px-2 py-1 cursor-pointer hover:bg-slate-100 gap-x-2"
				>
					<div
						className={`currency-flag currency-flag-${curr.currency.toLowerCase()} `}
					/>
					<p>
						<span className="text-sm font-semibold uppercase">
							{curr.currency}
						</span>{" "}
						- <span className="text-sm font-semibold">{curr.description}</span>
					</p>
				</li>
			)
		})
	}

	const handleClick = (curr: { currency: string; description: string }) => {
		if (fromOrTo === "from") {
			setQueryFrom!(`${curr.currency} - ${curr.description}`)
			setRequest({ ...request, from: curr.currency })
			setFromCurr!({
				currency: curr.currency,
				description: curr.description,
			})
		} else if (fromOrTo === "to") {
			setQueryTo!(`${curr.currency} - ${curr.description}`)
			setRequest({ ...request, to: curr.currency })
			setToCurr!({
				currency: curr.currency,
				description: curr.description,
			})
		}

		setIsOpen(false)
	}

	return (
		<>
			<div className="w-full " ref={ref}>
				<div className="relative">
					<input
						onFocus={() => setIsOpen(true)}
						onChange={(e) => handleFilter(e)}
						type="text"
						autoComplete="off"
						placeholder="EUR-Euro (€)"
						value={fromOrTo === "from" ? queryFrom : queryTo}
						className="block w-full px-3 py-2 rounded-md focus:outline-none focus:border focus:border-primary"
					/>

					<button
						onClick={() => setIsOpen(!isOpen)}
						className="absolute transition right-3 top-3"
					>
						{isOpen ? <FaX className="" /> : <FaChevronDown className="" />}
					</button>
				</div>
				{isOpen && (
					<ul className="flex flex-col p-3 mt-1 overflow-auto bg-white rounded-md gap-y-2 max-h-40">
						{filteredItems
							? displayedCurrency(filteredItems)
							: displayedCurrency(currencyList)}
					</ul>
				)}
			</div>
		</>
	)
}
