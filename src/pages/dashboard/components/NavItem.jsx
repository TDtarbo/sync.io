import { NavLink } from "react-router-dom";

const iconStyles = "text-2xl text-gray-800 group-hover:text-white transition-all duration-200 text-gray-600 font-";

const NavItem = ({ Icon, title, to}) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex gap-2 py-2 px-5 rounded-lg mb-3 cursor-pointer transition-all duration-300 group ${
          isActive ? "bg-indigo-500 text-white" : "hover:bg-indigo-700"
        }`
      }
    >
      {({ isActive }) => (
        <div className="flex items-center justify-center gap-2">
          <Icon className={`${iconStyles} ${isActive ? "text-white" : ""}`} />
          <h2 className={`transition-all duration-200 ${isActive ? "text-white" : "text-gray-800"} group-hover:text-white`}>
            {title}
          </h2>
        </div>
      )}
    </NavLink>
  );
};

export default NavItem;
