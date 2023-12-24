import { RiArrowRightDoubleFill } from "react-icons/ri"
import { CurrencyListItem, Request } from "../types/types"
import "/node_modules/currency-flags/dist/currency-flags.min.css"
import { PiArrowsLeftRightBold } from "react-icons/pi"

type ResultsProps = {
	rate: number
	request: Request
	supportedCurrencies: CurrencyListItem[]
	isResultLoading: boolean
}

const formatCurrency = (amount: number, curr: string) => {
	return amount.toLocaleString("en-US", {
		style: "currency",
		currency: curr,
	})
}

const Results = ({
	rate,
	request,
	supportedCurrencies,
	isResultLoading,
}: ResultsProps) => {
	if (isResultLoading) {
		return (
			<div className="flex justify-center items-center mt-8">
				<span className="loading loading-bars loading-lg"></span>
			</div>
		)
	}

	if (request && rate) {
		return (
			<div className="flex flex-col mt-8">
				<div className="flex justify-center items-center mt-5">
					<div className="px-4 py-2 rounded-full flex items-center justify-start  text-sm text-left gap-x-2">
						{formatCurrency(request.amount, request.from)}{" "}
						<div
							className={`currency-flag currency-flag-${request.from.toLowerCase()}`}
						/>
					</div>
					<RiArrowRightDoubleFill size={40} className="animate-pulse" />

					<div className="rounded-full px-4 py-2  flex items-center justify-center text-2xl font-medium text-center gap-x-2">
						{formatCurrency(request.amount * rate, request.to)}{" "}
						<div
							className={`currency-flag currency-flag-${request.to.toLowerCase()}`}
						/>
					</div>
				</div>
				<h3 className="mt-8 mb-1 text-xl font-medium text-center uppercase">
					Rates
				</h3>
				<div className="flex items-center justify-center gap-x-3">
					<div>
						<p className="flex items-center font-medium gap-x-2">
							<span
								className={`currency-flag currency-flag-${request.from.toLowerCase()}`}
							/>{" "}
							{formatCurrency(1, request.from)}
						</p>
					</div>
					<PiArrowsLeftRightBold size={25} />
					<p className="flex items-center font-medium gap-x-2">
						{formatCurrency(rate, request.to)}
						<span
							className={`currency-flag currency-flag-${request.to.toLowerCase()}`}
						/>
					</p>
				</div>
				<div className="flex items-center justify-center gap-x-3">
					<div>
						<p className="flex items-center font-medium gap-x-2">
							<span
								className={`currency-flag currency-flag-${request.to.toLowerCase()}`}
							/>{" "}
							{formatCurrency(1, request.to)}
						</p>
					</div>
					<PiArrowsLeftRightBold size={25} />
					<p className="flex items-center font-medium gap-x-2">
						{formatCurrency(1 / rate, request.from)}
						<span
							className={`currency-flag currency-flag-${request.from.toLowerCase()}`}
						/>
					</p>
				</div>
			</div>
		)
	}
}
export default Results
