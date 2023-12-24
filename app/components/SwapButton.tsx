"use client"

import { LuArrowUpDown } from "react-icons/lu"
import { handleSwapProps } from "../types/types"
import { handleSwap } from "../utils/querySwap"

const SwapButton = ({
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
	return (
		<>
			<button
				onClick={() =>
					handleSwap({
						request,
						setRequest,
						setQueryFrom,
						setQueryTo,
						setFromCurr,
						setToCurr,
						fromCurr,
						toCurr,
						setRate,
					})
				}
			>
				<LuArrowUpDown
					size={35}
					className="p-2 font-bold border rounded-full cursor-pointer"
				/>
			</button>
		</>
	)
}
export default SwapButton
