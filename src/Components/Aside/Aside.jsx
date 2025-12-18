
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
            <a
              href="#"
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <HiOutlineHome size={24} />
              <span className="text-lg">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <HiOutlineUserGroup size={24} />
              <span className="text-lg">Donors</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <HiOutlineHeart size={24} />
              <span className="text-lg">Blood Requests</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <HiOutlineClipboardList size={24} />
              <span className="text-lg">Blood Stock</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <HiOutlineChartPie size={24} />
              <span className="text-lg">Analytics</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <HiOutlineInbox size={24} />
              <span className="text-lg">Enquiries</span>
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center space-x-4 px-4 py-3 rounded-lg hover:bg-red-600 transition"
            >
              <HiOutlineCog size={24} />
              <span className="text-lg">Settings</span>
            </a>
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