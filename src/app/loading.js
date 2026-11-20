export default function Loading() {
    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="animate-pulse space-y-6">
                <div className="h-8 w-1/3 rounded-lg bg-slate-800/60"></div>
                <div className="h-4 w-2/3 rounded-lg bg-slate-800/40"></div>
                <div className="grid gap-6 pt-6 md:grid-cols-2">
                    <div className="h-56 rounded-xl bg-slate-800/50"></div>
                    <div className="h-56 rounded-xl bg-slate-800/50"></div>
                </div>
            </div>
        </div>
    );
}