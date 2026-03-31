import React from 'react';
import '../styles/Header.css';

interface HeaderProps {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    onClick?: () => void;
  };
}

const Header: React.FC<HeaderProps> = ({ title, description, actionButton }) => {
  return (
    <div className="header">
      <div className="header-content">
        <h2 className="header-title">{title}</h2>
        {description && <p className="header-description">{description}</p>}
      </div>
      {actionButton && (
        <button className="header-action-btn" onClick={actionButton.onClick}>
          ⬇ {actionButton.label}
        </button>
      )}
    </div>
  );
};

export default Header;
