import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { isMobile } from 'react-device-detect';

const renderContent = () => {
  if (isMobile) {
    return (
      <React.StrictMode>
      <App />
      </React.StrictMode>
    );
  }
  return (
    <div>This site is only for mobile.</div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  renderContent()
);
