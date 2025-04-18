import Logo from '@/components/logo';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

interface AlgoSimLayoutProps {
    foo?: string;
}

const AlgoSimLayout = (_props: AlgoSimLayoutProps) => {
    const [sortingAlgorithms] = useState<string[]>([
        'insertion',
        'bubble',
        'selection',
        'merge',
        'quick',
        'heap',
        'radix',
        'counting',
        'shell',
    ]);
    return (
        <section className="relative min-h-screen">
            <header className="flex flex-col px-12 py-2 text-white bg-gray-800 max-sm:px-4">
                <nav className="flex items-center justify-between max-sm:justify-center">
                    <ul className="flex uppercase gap-x-4 max-sm:gap-x-2 max-sm:gap-y-1 max-sm:flex-wrap">
                        {sortingAlgorithms.map((algo) => (
                            <li
                                key={algo}
                                className="opacity-30 first:opacity-100 hover:cursor-pointer text-xs"
                            >
                                {algo}
                            </li>
                        ))}
                    </ul>
                    <div className="max-sm:hidden">
                        <Logo />
                    </div>
                </nav>
            </header>
            <main className="px-12 py-10 mt-28">
                <Outlet />
            </main>
        </section>
    );
};

AlgoSimLayout.defaultProps = {
    foo: 'bar',
};

export default AlgoSimLayout;
