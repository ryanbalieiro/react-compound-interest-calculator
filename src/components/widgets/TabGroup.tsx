import {useUtils} from "@/hooks/utils.tsx";

interface TabGroupProps {
    items: TabProps[];
    selectedTabId?: number;
    onTabSelected?: (id: number) => void;
    className?: string;
}

interface TabProps {
    id: number;
    active?: boolean;
    label: string;
    icon?: string;
    onSelect?: (id: number) => void;
}

export function TabGroup({ items, selectedTabId, onTabSelected, className }: TabGroupProps) {
    return (
        <div className={`
            flex flex-row ${className}
            border-b border-secondary-40
        `}>
            {items.map(item => (
                <Tab id={item.id}
                     key={item.id}
                     active={item.active || item.id === selectedTabId}
                     label={item.label}
                     icon={item.icon}
                     onSelect={() => {
                         onTabSelected && onTabSelected(item.id);
                         item.onSelect && item.onSelect(item.id);
                     }}/>
            ))}
        </div>
    );
}

function Tab({ id, label, icon, active = false, onSelect }: TabProps) {
    const utils = useUtils();

    return (
        <button onClick={() => { onSelect && onSelect(id) }}
                className={`
                    flex items-center justify-center px-4 py-2 
                    rounded-t-lg text-sm md:text-base font-ubuntu font-bold
                    border border-secondary-40 border-b-0 cursor-pointer
                    ${utils.strIf(!active, 'bg-background text-secondary-30 hover:bg-muted/10 hover:text-primary')}
                    ${utils.strIf(active, 'bg-primary text-white')}
                `}>
            {icon && <i className={`${icon} md:mr-2`}/>}
            <span className={`hidden md:inline`}
                  dangerouslySetInnerHTML={{__html: label}}/>
        </button>
    );
}