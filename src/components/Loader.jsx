export default function Loader() {
  return (
    <div className="fixed inset-0 bg-[var(--color-background)] flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-6">
          {/* Animated shoe icon */}
          <div className="absolute inset-0 border-4 border-[var(--color-muted)] rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[var(--color-secondary)] rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-10 h-10 text-[var(--color-primary)]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21.5 15.5c0 .83-.67 1.5-1.5 1.5H4c-.83 0-1.5-.67-1.5-1.5v-1c0-.83.67-1.5 1.5-1.5h16c.83 0 1.5.67 1.5 1.5v1zm-18-3c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h15c.28 0 .5.22.5.5s-.22.5-.5.5h-15zm16-3H4.5c-.28 0-.5-.22-.5-.5s.22-.5.5-.5h15c.28 0 .5.22.5.5s-.22.5-.5.5z" />
            </svg>
          </div>
        </div>
        <h2 className="font-serif text-2xl text-[var(--color-primary)] mb-2">Calzados Suárez</h2>
        <p className="text-[var(--color-muted-foreground)] text-sm">Zapatería Artesanal</p>
      </div>
    </div>
  )
}
