function Sidebar({ user }) {
  return (
    <aside className="w-72 min-h-screen bg-[#2c2c29] border-r border-zinc-700 p-5">
      <h1 className="text-2xl font-bold mb-10">
        <span className="text-indigo-400">Task</span>
        <span className="text-white">Flow</span>
      </h1>

      <p className="text-xs text-zinc-400 mb-4">MAIN</p>

      <nav className="space-y-3">
        <a
          href="/dashboard"
          className="block bg-indigo-100 text-indigo-700 px-4 py-3 rounded-xl font-semibold"
        >
          Dashboard
        </a>

        <a
          href="/projects"
          className="block text-zinc-300 px-4 py-3 rounded-xl hover:bg-zinc-700"
        >
          Projects
        </a>  

        <div className="text-zinc-300 px-4 py-3 rounded-xl">
          My Tasks
        </div>

        <div className="text-zinc-300 px-4 py-3 rounded-xl">
          Overdue
        </div>
      </nav>

      {user?.role === "ADMIN" && (
        <>
          <p className="text-xs text-zinc-400 mt-8 mb-4">ADMIN ONLY</p>

          <nav className="space-y-3">
            <div className="text-zinc-300 px-4 py-3 rounded-xl">
              Members
            </div>

            <div className="text-zinc-300 px-4 py-3 rounded-xl">
              Roles & Access
            </div>

            <div className="text-zinc-300 px-4 py-3 rounded-xl">
              Settings
            </div>
          </nav>
        </>
      )}
    </aside>
  );
}

export default Sidebar;