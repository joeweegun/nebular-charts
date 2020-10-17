import React,{ FC, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames'; 

export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
  className?: string;
  /** 设置Button的禁用 */
  disabled?:boolean;
  /**设置尺寸*/
  size?: ButtonSize;
  btnType?:ButtonType;
  href? : string;
  children:React.ReactNode
}

type NativeButtonprops = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>; // 交叉类型
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonprops & AnchorButtonProps>;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互
 * ## 引用方法
 * 
 * ~~~js
 * import { Button } from 'nebular-component'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const { 
    btnType,
    className,
    disabled,
    size,
    href,
    children,
    ...restProps
  } = props;
  const classes = classNames('btn',className, {
      [`btn-${btnType}`] : btnType,
      [`btn-${size}`]  :size,
      'disabled' : (btnType === 'link') && disabled
  });

  if(btnType === 'link' && href){
    return (
      <a 
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    );
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >{children}</button>
    );
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: 'default'
}

export default Button;