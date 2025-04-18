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
    const [N, setN] = useState<number>(10);
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
    const handleRandomNumbers = () => {
        const newNumbers = [...Array(N).keys()];
        for (let index = 0; index < newNumbers.length; index++) {
            const newValue = Math.floor(Math.random() * 100);
            newNumbers[index] = newValue;
        }
        setRandomNumbers(newNumbers);
    };
    const sortArray = () => {
        const newNumbers: number[] = JSON.parse(JSON.stringify(randomNumbers));
        return setRandomNumbers(newNumbers.sort((a, b) => a - b));
    };
    return (
        <div>
            <div className="flex justify-center items-end gap-x-2  h-40">
                {randomNumbers.map((value, idx) => {
                    const maxValue = Math.max(...randomNumbers);
                    const heightPercent = (value / maxValue) * 100;

                    return (
                            <div
                                key={idx}
                                style={
                                    {
                                        height: `${heightPercent}%`,
                                        '--value': `"${value}"`,
                                    } as React.CSSProperties
                                }
                                className={cn(
                                    'relative  w-14 bg-blue-200 flex h-full flex-col justify-end items-center rounded-xs text-gray-800 transition-all duration-400 ease-in-out',
                                    value < 14
                                        ? 'before:content-[var(--value)] before:absolute before:-top-7 before:text-xl before:text-gray-600'
                                        : ''
                                )}
                            >
                                <span className={cn('text-xl', { hidden: value < 14 })}>
                                    {value}
                                </span>
                            </div>
                    );
                })}
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
                                defaultValue={N}
                                onChange={(e) => setN(+e.target.value)}
                                max={22}
                                min={1}
                            />

                            <button
                                className="block h-full px-2 text-xs tracking-wide text-white uppercase bg-green-400 rounded-xs hover:cursor-pointer"
                                onClick={handleRandomNumbers}
                            >
                                random
                            </button>
                            <button
                                className="block h-full px-2 text-xs tracking-wide text-white uppercase bg-green-400 rounded-xs hover:cursor-pointer"
                                onClick={sortArray}
                            >
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
