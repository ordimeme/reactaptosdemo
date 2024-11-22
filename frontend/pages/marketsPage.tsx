const Markets = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Markets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 border rounded-lg shadow bg-[var(--softBg)] text-[var(--textColor)]">
          <h2 className="text-xl font-semibold mb-2">Market Info</h2>
          <p className="text-[var(--softTextColor)]">Market details will be displayed here</p>
        </div>
        <div className="p-4 border rounded-lg shadow bg-[var(--softBg)] text-[var(--textColor)]">
          <h2 className="text-xl font-semibold mb-2">Trading Stats</h2>
          <p className="text-[var(--softTextColor)]">Trading statistics will be shown here</p>
        </div>
      </div>
    </div>
  )
}

export default Markets