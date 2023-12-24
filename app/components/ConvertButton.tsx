"use client"
import { toast } from "react-toastify"
import { Request } from "../types/types"
import { getRate } from "../utils/getRate"

type ConvertButtonProps = {
	request: Request
	rate: number
	setRate: React.Dispatch<React.SetStateAction<number>>

	setIsResultLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const ConvertButton = ({
	request,
	rate,
	setRate,
	setIsResultLoading,
}: ConvertButtonProps) => {
	const handleClick = async () => {
		if (!request.amount && !request.from && !request.to) {
			toast.error(
				"Please provide a correct number (ex: 123.50) and select currencies"
			)
		} else if (!request.amount) {
			toast.error("Please provide a correct number (ex: 123.50)")
		} else if (!request.from && !request.to) {
			toast.error("Please select currencies ")
		} else if (!request.from) {
			toast.error("Please select the currency you want to convert from ")
		} else if (!request.to) {
			toast.error("Please select the currency you want to convert to ")
		}

		setIsResultLoading(true)
		const data = await getRate(request)

		setRate(
			parseFloat(
				parseFloat((data.new_amount / data.old_amount).toString()).toFixed(2)
			)
		)
		setIsResultLoading(false)
	}
	return (
		<>
			<button
				type="button"
				className="w-full uppercase btn btn-primary"
				onClick={handleClick}
			>
				Convert
			</button>
		</>
	)
}
export default ConvertButton
