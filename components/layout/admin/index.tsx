import Header from './header'

export default function LayoutAdmin({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className="min-h-screen bg-slate-50">
				<Header />
				{children}
			</main>
		</>
	)
}
