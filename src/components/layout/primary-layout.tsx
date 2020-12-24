import React from 'react'
import Header from './header'

interface ChildrenProps {
    children: any
}

const PrimaryLayout = ({ children }: ChildrenProps) => {
    return (
        <React.Fragment>
            <Header />
            {children}
        </React.Fragment>
    );
};

export default PrimaryLayout;