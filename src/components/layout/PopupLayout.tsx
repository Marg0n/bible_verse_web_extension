import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Container from '../ui/Container';

interface Props {
    children: React.ReactNode;
    title: string;
    footer?: React.ReactNode;
    headerAction?: React.ReactNode;
}

export default function PopupLayout({ children, title, footer, headerAction }: Props) {
    return (
        <Container>
            <Header title={title} rightAction={headerAction} />
            <main className="flex-1 overflow-y-auto px-4 pt-1 pb-6 space-y-4 scroll-smooth">
                {children}
            </main>
            {footer && <Footer>{footer}</Footer>}
        </Container>
    );
}
