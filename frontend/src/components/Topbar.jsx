function Topbar({ user, logout }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-700 px-8 py-5 bg-[#242424]">
      <input
        type="text"
        placeholder="Search tasks, projects..."
        className="bg-[#1f1f1f] border border-zinc-700 rounded-xl px-4 py-2 text-white w-80 outline-none"
      />

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
          {user?.name?.charAt(0)}
        </div>

        <div>
          <h3 className="text-white font-semibold">
            {user?.name}
          </h3>

          <p className="text-zinc-400 text-sm">
            {user?.role}
          </p>
        </div>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Topbar;