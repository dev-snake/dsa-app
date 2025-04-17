import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
interface SortingPageProps {
    foo: string;
}
interface IActiveMounted {
    isActive: boolean;
    count: number;
}

const SortingPage = (props: SortingPageProps) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isOptions, setIsOptions] = useState<boolean>(false);
    const [randomNumbers, setRandomNumbers] = useState<number[]>([29, 10, 14, 37, 14]);
    const [mounted, setMounted] = useState<IActiveMounted>({
        isActive: true,
    } as IActiveMounted);
    const handleMounted = () => {
        setIsActive((prev) => {
            if (prev) {
                setIsOptions(false);
            }
            return !prev;
        });
        if (mounted.count === 1) return;
        setMounted({ isActive: false, count: 1 });
    };
    return (
        <div>
            <div className="flex justify-center gap-x-2">
                {randomNumbers.map((value, idx) => (
                    <div
                        key={idx}
                        className="text-center text-gray-800 bg-orange-400 select-none ring-3 ring-orange-200 size-14 rounded-xs"
                    >
                        <span className="text-2xl font-bold leading-14 ">{value}</span>
                    </div>
                ))}
            </div>
            <div className="absolute bg-green-400 shadow select-none bottom-8 left-2 rounded-xs hover:cursor-pointer">
                <div className="px-2 py-5 text-white " onClick={handleMounted}>
                    <ChevronRight
                        className={cn('', {
                            'rotate-180 transition-all duration-500': isActive,
                            'rotate-0 transition-all duration-500': !isActive,
                        })}
                    />
                </div>
                <div
                    className={cn('', {
                        block: isActive,
                        hidden: mounted.isActive,
                    })}
                >
                    <div
                        className={cn(
                            'absolute left-10 ml-1  origin-left h-full top-0 transition-all duration-500 ',
                            {
                                'before:absolute before:block before:bg-green-400 shadow    before:animation-show-in before:h-full ':
                                    isActive,
                                'before:absolute before:block before:bg-green-400 z-20 pointer-events-none   before:animation-show-out before:h-full ':
                                    !isActive,
                            }
                        )}
                    >
                        <button
                            className={cn('text-xs w-full h-1/2 relative z-10 px-4   uppercase ', {
                                'text-white hover:bg-green-500 z-0 hover:cursor-pointer': isActive,
                            })}
                            onClick={() => setIsOptions((prev) => !prev)}
                        >
                            <span
                                className={cn({
                                    'opacity-0 transition-all duration-200 text-transparent ':
                                        !isActive,
                                })}
                            >
                                Create(A)
                            </span>
                        </button>
                        <button
                            className={cn('text-xs w-full h-1/2 relative z-10 px-4   uppercase  ', {
                                'text-white hover:bg-green-500 z-0 hover:cursor-pointer': isActive,
                            })}
                        >
                            <span
                                className={cn({
                                    'opacity-0 transition-all duration-200 text-transparent':
                                        !isActive,
                                })}
                            >
                                Sort(B)
                            </span>
                        </button>
                    </div>
                    <div
                        className={cn(
                            'absolute top-0 left-36 ml-1  h-1/2 py-1 transition-all duration-700',
                            {
                                'opacity-0 ': !isOptions,
                            }
                        )}
                    >
                        <div className="flex items-center h-full gap-x-1">
                            <span className="whitespace-nowrap">N =</span>
                            <input
                                type="number"
                                placeholder="N"
                                className="inline-block h-full px-2 text-xs bg-white outline-none max-w-14"
                                defaultValue={10}
                                max={22}
                                min={1}
                            />
                            <button className="block h-full px-2 text-xs tracking-wide text-white uppercase bg-green-400 rounded-xs hover:cursor-pointer">
                                random
                            </button>
                            <button className="block h-full px-2 text-xs tracking-wide text-white uppercase bg-green-400 rounded-xs hover:cursor-pointer">
                                sorted
                            </button>
                            <span className="whitespace-nowrap">N =</span>
                            <input
                                type="text"
                                placeholder="1,2,3,4,..."
                                className="inline-block h-full px-2 text-xs bg-white outline-none min-w-14"
                                defaultValue={[29, 10, 14, 37, 14].join(',')}
                            />
                            <button className="block h-full px-2 text-xs tracking-wide text-white uppercase bg-green-400 rounded-xs hover:cursor-pointer">
                                Go
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

SortingPage.defaultProps = {
    foo: 'bar',
};

export default SortingPage;
