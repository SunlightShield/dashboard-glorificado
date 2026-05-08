function Footer() {
  return (
    <footer className="w-full bg-zinc-900 border-t border-zinc-800 px-8 py-4">
      <span className="text-zinc-600 text-xs font-mono">
        Sebastian Espinoza © {new Date().getFullYear()}
      </span>
    </footer>
  )
}

export default Footer