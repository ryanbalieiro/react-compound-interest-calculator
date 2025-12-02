import {useUtils} from "@/hooks/utils.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";

interface TabGroupProps {
    items: TabProps[];
    shrinkBreakpoint?: number;
    selectedTabId?: number;
    onTabSelected?: (id: number) => void;
    className?: string;
}

interface TabProps {
    id: number;
    active?: boolean;
    shrink?: boolean;
    label: string;
    icon?: string;
    onSelect?: (id: number) => void;
}

export function TabGroup({ items, selectedTabId, shrinkBreakpoint = 640, onTabSelected, className }: TabGroupProps) {
    const viewport = useViewport();

    const shouldShrink = viewport.innerWidth < shrinkBreakpoint;

    return (
        <div className={`
            flex flex-row ${className}
            border-b border-secondary-40
        `}>
            {items.map(item => (
                <Tab id={item.id}
                     key={item.id}
                     shrink={shouldShrink}
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

function Tab({ id, label, icon, shrink = false, active = false, onSelect }: TabProps) {
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
            {icon && <i className={`${icon} ${shrink ? 'mr-0' : 'mr-2'}`}/>}
            <span className={`${shrink ? 'hidden' : 'md-inline'}`}
                  dangerouslySetInnerHTML={{__html: label}}/>
        </button>
    );
}