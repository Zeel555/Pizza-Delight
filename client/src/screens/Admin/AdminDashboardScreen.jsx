import { useEffect, useState } from 'react';
import {
    FaBoxes,
    FaClipboardList,
    FaHome,
    FaPizzaSlice,
    FaUser,
    FaUsers,
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Import Thunks
import { listAdminUsers } from '../../redux/asyncThunks/adminThunks';
import { listInventory } from '../../redux/asyncThunks/inventoryThunks';
import { listOrders } from '../../redux/asyncThunks/orderThunks';
import { listPizzas } from '../../redux/asyncThunks/pizzaThunks';
import { listUsers } from '../../redux/asyncThunks/userThunks';

// Import Components
import MainContent from '../../components/ui/Admin/Dashboard/MainContent';
import SideBar from '../../components/ui/Admin/Dashboard/SideBar/SideBar';

function AdminDashboardScreen() {
  const menuItems = [
    { name: 'Home', icon: <FaHome className="mr-2" /> },
    { name: 'Staff', icon: <FaUsers className="mr-2" /> },
    { name: 'Users', icon: <FaUser className="mr-2" /> },
    { name: 'Pizzas', icon: <FaPizzaSlice className="mr-2" /> },
    { name: 'Orders', icon: <FaClipboardList className="mr-2" /> },
    { name: 'Inventory', icon: <FaBoxes className="mr-2" /> },
  ];

  const [activeMenuItem, setActiveMenuItem] = useState('Home');
  const [collapsible, setCollapsible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { adminUserInfo } = useSelector((state) => state.admin);

  const toggleSidebar = () => {
    setCollapsible((prev) => !prev);
  };

  const handleMenuItemClick = (name) => {
    setActiveMenuItem(name);
    toggleSidebar();
  };

  // ✅ Redirect if admin not logged in
  useEffect(() => {
    if (!adminUserInfo) {
      navigate('/admin/login');
    }
  }, [navigate, adminUserInfo]);

  // ✅ Redirect if normal user is logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  // ✅ Load admin data ONLY after admin login
  useEffect(() => {
    if (adminUserInfo) {
      dispatch(listUsers());
      dispatch(listAdminUsers());
      dispatch(listPizzas());
      dispatch(listOrders());
      dispatch(listInventory());
    }
  }, [dispatch, adminUserInfo]);

  return (
    <section className="min-h-screen flex flex-row bg-green-200 text-green-800 pt-16 sm:pt-20">
      {adminUserInfo && (
        <>
          {collapsible && (
            <SideBar
              menuItems={menuItems}
              handleMenuItemClick={handleMenuItemClick}
              activeMenuItem={activeMenuItem}
              collapsible={collapsible}
            />
          )}

          <MainContent
            menuItems={menuItems}
            activeMenuItem={activeMenuItem}
            collapsible={collapsible}
            onToggleSidebar={toggleSidebar}
          />
        </>
      )}
    </section>
  );
}

export default AdminDashboardScreen;
