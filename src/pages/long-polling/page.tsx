import Image from "next/image";

export default function LongPolling() {
	return (
		<div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
			<h1>Это страница, на примере которой я буду изучать Long Polling</h1>
			<Image src="window.svg" alt="Window" width={100} height={100} />
		</div>
	)
}