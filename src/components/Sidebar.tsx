import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({isOpen, onClose}: SidebarProps) => {
    const navigate = useNavigate();

    return(
        <AnimatePresence>
      {isOpen && (
        <>
          {/* 배경 dim */}
          <motion.div
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 사이드바 */}
          <motion.div
            className="fixed top-0 left-0 h-full w-64 bg-black text-white shadow-lg p-5"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <h2 className="text-xl font-bold mb-4">Menu</h2>

            <ul className="flex flex-col gap-3">
              <li 
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => navigate('/')}
              >
                Home
              </li>
              <li 
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => navigate('/page1')}
              >
                Page 1
              </li>
              <li 
                className="hover:text-blue-500 cursor-pointer"
                onClick={() => navigate('/page2')}
              >
                Page 2
              </li>
            </ul>
          </motion.div>
        </>
      )}
    </AnimatePresence>
    )
}

export default Sidebar

