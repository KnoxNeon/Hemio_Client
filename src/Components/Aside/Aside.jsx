
import {
  HiOutlineHome,
  HiOutlineUserGroup,
  HiOutlineHeart,
  HiOutlineClipboardList,
  HiOutlineChartPie,
  HiOutlineInbox,
  HiOutlineCog,
  HiOutlineLogout,
} from 'react-icons/hi';
import { Link, NavLink } from 'react-router';

const Aside = () => {
  return (
    <aside className="bg-red-500 text-white w-64 h-screen flex flex-col">
      {/* Logo/Header */}
      <div className="flex items-center space-x-4 p-6 border-b border-red-600">
        <div className="bg-white text-red-700 rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
          BD
        </div>
        <span className="text-xl font-semibold">Blood Donation Admin</span>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">



          <li>
            <NavLink to='/dashboard/main'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineHome size={24} /> <span className="text-lg">DashBoard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/add-request'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineHeart size={24} /> <span className="text-lg">Add Request</span>
            </NavLink>
          </li>
          <li>
            <NavLink to='/dashboard/all-users'
              className={({isActive}) =>
                `flex items-center space-x-4 px-4 py-3 rounded-lg transition  ${isActive? "bg-white text-red-500":"hover:bg-red-600"}  }`}>
              <HiOutlineUserGroup size={24} /> <span className="text-lg">All Users</span>
            </NavLink>
          </li>




         
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-red-600">
        <a
          href="#"
          className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
        >
          <HiOutlineLogout size={24} />
          <span className="text-lg">Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default Aside