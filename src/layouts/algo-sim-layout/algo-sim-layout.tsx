import Logo from '@/components/logo';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <section className="min-h-screen relative">
            <header className="bg-gray-800 text-white py-2 px-12 max-sm:px-4 flex flex-col">
                <nav className="flex justify-between max-sm:justify-center items-center">
                    <ul className="flex gap-x-4 max-sm:gap-x-2 max-sm:gap-y-1 max-sm:flex-wrap uppercase">
                        {sortingAlgorithms.map((algo) => (
                            <li
                                key={algo}
                                className="opacity-30 first:opacity-100 hover:cursor-pointer max-sm:text-xs"
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
            <main className="px-12 py-10">
                <Outlet />
            </main>
        </section>
    );
};

AlgoSimLayout.defaultProps = {
    foo: 'bar',
};

export default AlgoSimLayout;
