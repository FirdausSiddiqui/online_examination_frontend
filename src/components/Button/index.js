import React, { useMemo, memo } from 'react';

import styles from './Button.module.css';
import ActivityIndicator from '../ActivityIndicator';

const Button = React.forwardRef(
  (
    {
      children,
      loading = false,
      primary = false,
      secondary = false,
      rounded = false,
      shadow = false,
      size = 'medium',
      className,
      ...otherProps
    },
    ref
  ) => {
    const getStyle = () => {
      let style = ``;
      if (primary) {
        style += `${styles.primary} `;
      }

      if (secondary) {
        style += `${styles.secondary} `;
      }

      if (shadow) {
        style += `${styles.shadow} `;
      }

      return style;
    };

    const getIndicatorColor = () => {
      if (primary) {
        return 'white';
      }

      if (secondary) {
        return '#007bff';
      }
    };

    const sizeClass = useMemo(() => {
      switch (size) {
        case 'small':
          return styles.sm;
        case 'medium':
          return styles.md;
        case 'large':
          return styles.lg;
        case 'auto':
          return styles.at;
        default:
          return styles.md;
      }
    }, [size]);

    const roundClass = useMemo(() => {
      if (!rounded) {
        return '';
      }
      switch (size) {
        case 'small':
          return styles.sm_rounded;
        case 'medium':
          return styles.md_rounded;
        case 'large':
          return styles.lg_rounded;
        default:
          return '';
      }
    }, [rounded, size]);

    return (
      <button
        ref={ref}
        {...otherProps}
        className={`${
          styles.container
        } ${className} ${getStyle()} ${sizeClass} ${roundClass} rc`}>
        {loading ? (
          <ActivityIndicator color={getIndicatorColor()} size="s" />
        ) : (
          children
        )}
      </button>
    );
  }
);

export default Button;
