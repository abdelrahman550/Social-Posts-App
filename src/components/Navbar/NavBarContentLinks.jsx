import { House, MessageCircle, User } from "lucide-react";
import { NavLink } from "react-router";

export default function NavBarContentLinks() {
  return (
    <div className="flex min-w-0 items-center gap-1 overflow-x-auto rounded-2xl border border-slate-200 bg-slate-50/90 px-1 py-1 sm:px-1.5">
      <NavLink to={"/feed"} className="navbar-content-link">
        <span>
          <House size={20} />
        </span>
        <span>Feed</span>
      </NavLink>
      <NavLink to={"/profile"} className="navbar-content-link">
        <span>
          <User size={20} />
        </span>
        <span>Profile</span>
      </NavLink>
      <button className="navbar-content-link">
        <span>
          <MessageCircle size={20} />
        </span>
        <span>Notifications</span>
      </button>
    </div>
  );
}
