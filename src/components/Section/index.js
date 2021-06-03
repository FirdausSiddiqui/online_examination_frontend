import React from 'react';
import './section.css';

const Section = ({ id, children }) => {
  return (
    <section className="section" id={id}>
      {children}
    </section>
  );
};

const SectionHeader = ({ style, children }) => {
  return <header style={style}>{children}</header>;
};

const SectionContent = ({ className, children }) => {
  return <main className={className}>{children}</main>;
};

export { Section, SectionHeader, SectionContent };
