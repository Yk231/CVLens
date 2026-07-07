interface Props {
    title: string
    subtitle: string
}

export default function Header({ title, subtitle }: Props) {
    return (
        <div className="flex flex-col gap-1">
            <h2 className="text-4xl font-bold text-slate-900">{title}</h2>
            <p className="text-xl text-slate-500">{subtitle}</p>
        </div>
    )
}