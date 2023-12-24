"use client"

import { useEffect, useState } from "react"
import { CurrencyListItem, Request } from "../types/types"
import SwapButton from "./SwapButton"
import ToggleTheme from "./ToggleTheme"
import dayjs from "dayjs"
import AmountInput from "./AmountInput"
import SearchInput from "./SearchInput"
import ConvertButton from "./ConvertButton"
import Results from "./Results"

type LandingPageProps = {
	supportedCurrencies: CurrencyListItem[]
}
const LandingPage = ({ supportedCurrencies }: LandingPageProps) => {
	const [theme, setTheme] = useState(
		localStorage.getItem("theme") ? localStorage.getItem("theme") : "coffee"
	)
	useEffect(() => {
		localStorage.setItem("theme", theme as string)
		const localTheme = localStorage.getItem("theme")
		document
			.querySelector("html")
			?.setAttribute("data-theme", localTheme as string)
	}, [theme])
	const [currencyList, setCurrencyList] = useState<
		CurrencyListItem[] | undefined
	>([])
	const [request, setRequest] = useState<Request>({
		amount: 0,
		from: "",
		to: "",
	})
	const [isResultLoading, setIsResultLoading] = useState(false)
	const [rate, setRate] = useState(0)
	const [queryFrom, setQueryFrom] = useState("")
	const [queryTo, setQueryTo] = useState("")

	const [fromCurr, setFromCurr] = useState<CurrencyListItem>({
		currency: "",
		description: "",
	})
	const [toCurr, setToCurr] = useState<CurrencyListItem>({
		currency: "",
		description: "",
	})
	return (
		<>
			<div className="relative max-w-md min-h-screen p-8 mx-auto  ">
				<ToggleTheme theme={theme} setTheme={setTheme} />
				<h1 className="mb-8 text-2xl font-medium text-center uppercase">
					Currency Converter
				</h1>
				<div className="flex flex-col items-center justify-start gap-y-4">
					<AmountInput setRequest={setRequest} request={request} />
					<div className="flex flex-col w-full gap-y-2">
						<span className="text-sm font-medium">FROM</span>
						<SearchInput
							currencyList={supportedCurrencies}
							setRequest={setRequest}
							request={request}
							fromOrTo="from"
							queryFrom={queryFrom}
							setQueryFrom={setQueryFrom}
							setFromCurr={setFromCurr}
						/>
					</div>

					<SwapButton
						request={request}
						setRequest={setRequest}
						setQueryFrom={setQueryFrom}
						setQueryTo={setQueryTo}
						setFromCurr={setFromCurr}
						setToCurr={setToCurr}
						fromCurr={fromCurr}
						toCurr={toCurr}
						setRate={setRate}
					/>

					<div className="flex flex-col w-full gap-y-2">
						<span className="text-sm font-medium">TO</span>
						<SearchInput
							currencyList={supportedCurrencies}
							setRequest={setRequest}
							request={request}
							fromOrTo="to"
							queryTo={queryTo}
							setQueryTo={setQueryTo}
							setToCurr={setToCurr}
						/>
					</div>
					<ConvertButton
						setIsResultLoading={setIsResultLoading}
						request={request}
						rate={rate}
						setRate={setRate}
					/>
				</div>
				<Results
					isResultLoading={isResultLoading}
					rate={rate}
					supportedCurrencies={supportedCurrencies}
					request={request}
				/>
				<p className="mt-8">Last updated on {dayjs().format("DD/MM/YYYY")}</p>
			</div>
		</>
	)
}
export default LandingPage
