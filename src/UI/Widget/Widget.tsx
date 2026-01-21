import cl from './Widget.module.css'

interface IWidgetProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}


function Widget({children, ...props}: IWidgetProps) {
    const {className, ...restProps} = props
    return ( 
        <div className={cl.widget + ' ' + className} {...restProps}>
            {children}
        </div>
     );
}

export default Widget;