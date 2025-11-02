export const ComponentTag = ({ children }: { children: React.ReactNode }) => {
  if (process.env.NODE_ENV !== 'development') return null

  return (
    <div className="relative size-0">
      <span className="absolute bg-yellow-500 p-2 text-xs text-black">{children}</span>
    </div>
  )
}
