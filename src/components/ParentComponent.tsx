import React from 'react';

interface ChildComponentProps {
  children: React.ReactNode[];
}

const ChildComponent: React.FC<ChildComponentProps> = ({ children }) => {
  return (
    <div>
      {children.map((child, index) => (
        <div key={index}>{child}</div>
      ))}
    </div>
  );
};

const ParentComponent: React.FC = () => {
  const items = [
    <p key="1">これは子要素1です！</p>,
    <p key="2">これは子要素2です！</p>,
    <p key="3">これは子要素3です！</p>,
  ];

  return (
    <ChildComponent>
      {items}
    </ChildComponent>
  );
};

export default ParentComponent;

