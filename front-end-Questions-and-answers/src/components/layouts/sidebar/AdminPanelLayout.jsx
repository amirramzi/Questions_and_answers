import { useState } from "react";
import PropTypes from "prop-types";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/outline";
import SidebarLayout from "./SidebarLayout";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminPanelLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <>
      <div>
        <SidebarLayout open={sidebarOpen} setOpen={setSidebarOpen} />
        <div className="flex flex-col md:pr-64 min-h-screen">
          <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-gray-900 shadow border-b border-purple-950">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <main className="flex-1 bg-gray-900 min-h-full">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  );
};

AdminPanelLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminPanelLayout;
