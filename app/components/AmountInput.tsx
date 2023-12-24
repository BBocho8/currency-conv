import { Request } from "../types/types"

type AmountInputProps = {
	setRequest: React.Dispatch<React.SetStateAction<Request>>
	request: Request
}

export default function AmountInput({ request, setRequest }: AmountInputProps) {
	return (
		<input
			onChange={(e) =>
				setRequest({
					...request,
					amount: parseFloat(parseFloat(e.target.value).toFixed(2)),
				})
			}
			type="number"
			placeholder="Enter amount here"
			className="block w-full px-3 py-2 rounded-md focus:outline-none focus:border focus:border-primary"
		/>
	)
}
