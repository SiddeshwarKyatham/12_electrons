function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
      <p className="text-sm text-slate-300">{label}</p>
    </div>
  )
}

export default Spinner
