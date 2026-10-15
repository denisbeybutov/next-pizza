import { Search } from 'lucide-react';
import React from 'react';

interface Props {
    className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
    return (
        <div className='flex rounded-2xl flex-1 justify-between relative h-11'>
            <Search className='absolute top-1/2 -translate-y-1/2 left-3 h-5 text-gray-400'/>
            <input
              className='rounded-2xl outline-none w-full bg-gray-100 pl-11'
              type="text"
              placeholder='Найти пиццу...'
            />
        </div>
    );
};