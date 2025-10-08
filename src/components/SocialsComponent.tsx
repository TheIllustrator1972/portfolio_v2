import { SocialConfigItem } from '@/app/constants';
import React from 'react';

interface SocialsComponentProps {
    config: SocialConfigItem[];
}


const SocialsComponent = ({ config = [] }: SocialsComponentProps) => {
    return (
        <div className="z-10 flex flex-wrap justify-center gap-4 p-4 ">
            {config.map((item, index) => {
                const Icon = item.icon;
                const linkProps = item.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {};

                return (
                    <a
                        key={index}
                        href={item.url}
                        aria-label={item.name}
                        title={item.description}
                        {...linkProps}
                        className={`
                            flex items-center justify-center w-12 h-12 rounded-full 
                            bg-gray-100 dark:bg-gray-700 transition-all duration-300 
                            transform hover:scale-110 hover:shadow-lg
                            ${item.color}
                        `}
                    >
                        <Icon className="text-2xl w-5 h-5" />
                    </a>
                );
            })}
        </div>
    );
};

export default SocialsComponent