import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRight } from 'lucide-react';

interface SortingPageProps {
    foo: string;
}

const SortingPage = (props: SortingPageProps) => {
    return (
        <div>
            <div className="flex gap-x-2 justify-center">
                {Array.from({ length: 20 }).map((_, idx) => (
                    <div
                        key={idx}
                        className="w-full  bg-blue-200 rounded-xs my-2 max-w-14 h-48 text-center"
                    >
                        {idx}
                    </div>
                ))}
            </div>
            <button className="absolute bottom-8 left-2 py-5 px-2 rounded-xs shadow bg-green-400 hover:cursor-pointer select-none">
                <ChevronRight className=" text-white " />
                <div className="absolute left-10 ml-1 bg-green-400 h-full top-0 shadow">
                    <button className="text-xs w-full h-1/2 px-4 hover:cursor-pointer text-white uppercase hover:bg-green-500">
                        Create(A)
                    </button>
                    <button className="text-xs w-full h-1/2 px-4 hover:cursor-pointer text-white uppercase hover:bg-green-500">
                        Sort(B)
                    </button>
                </div>
                <div className="absolute top-0 left-36 ml-1  h-1/2 py-1">
                    <div className="flex h-full items-center gap-x-1">
                        <span className="whitespace-nowrap">N =</span>
                        <input
                            type="number"
                            placeholder="N"
                            className="bg-white h-full inline-block outline-none text-xs px-2 max-w-14"
                            defaultValue={10}
                        />
                        <button className="bg-green-400 block text-xs h-full px-2 uppercase text-white tracking-wide rounded-xs hover:cursor-pointer">
                            random
                        </button>
                        <button className="bg-green-400 block text-xs h-full px-2 uppercase text-white tracking-wide rounded-xs hover:cursor-pointer">
                            sorted
                        </button>
                        <span className="whitespace-nowrap">N =</span>
                        <input
                            type="text"
                            placeholder="1,2,3,4,..."
                            className="bg-white h-full inline-block outline-none text-xs px-2 min-w-14"
                            defaultValue={[29, 10, 14, 37, 14].join(',')}
                        />
                        <button className="bg-green-400 block text-xs h-full px-2 uppercase text-white tracking-wide rounded-xs hover:cursor-pointer">
                            Go
                        </button>
                    </div>
                </div>
            </button>
        </div>
    );
};

SortingPage.defaultProps = {
    foo: 'bar',
};

export default SortingPage;
