import React, { useState } from 'react';
import '../styles/Sidebar.css';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarProps {
  activeItem?: string;
  onNavClick?: (itemId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'transactions', onNavClick }) => {
  const [active, setActive] = useState(activeItem);

  const navItems: NavItem[] = [
    { id: 'tenpistas', label: 'Tenpistas', icon: '👤' },
    { id: 'transactions', label: 'Transactions', icon: '💳' },
  ];

  const handleNavClick = (itemId: string) => {
    setActive(itemId);
    onNavClick?.(itemId);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-title">Architectural Pro</h1>
        <p className="sidebar-subtitle">Premium Workspace</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => handleNavClick(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
