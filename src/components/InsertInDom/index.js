import { useRef, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

const InsertInDom = ({ children, domId = 'root', isModal = false }) => {
  const domContainerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      if (domContainerRef.current) {
        document.body.removeChild(domContainerRef.current);
      }
      document.body.style.overflow = 'auto';
    };
  }, []);

  const applyAbsoluteStyles = (container) => {
    const styles = {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      'z-index': '1000000'
    };
    Object.keys(styles).forEach((key) => {
      container.style[key] = styles[key];
    });
  };

  const containerRef = useMemo(() => {
    if (domId) {
      return document.getElementById(domId);
    }

    const oldElem = document.getElementById('react_portal');
    if (oldElem) {
      domContainerRef.current = oldElem;
      return oldElem;
    }

    const cont = document.createElement('div');
    cont.id = 'react_portal';
    if (isModal) {
      applyAbsoluteStyles(cont);
    }
    document.body.append(cont);
    domContainerRef.current = cont;
    return cont;
  }, [domId, isModal]);
  return ReactDOM.createPortal(children, containerRef);
};
export default InsertInDom;
