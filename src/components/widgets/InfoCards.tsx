import {useUtils} from "@/hooks/utils.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";

interface InfoCardsProps {
    items?: InfoCardItemProps[];
}

interface InfoCardWidgetProps {
    item: InfoCardItemProps;
    shouldDisplayAsList?: boolean;
}

interface InfoCardItemProps {
    type: "card" | "icon";
    label?: string;
    value?: number | string;
    parsedValue?: string;
    color?: string;
}

export default function InfoCards({ items } : InfoCardsProps) {
    const utils = useUtils();
    const viewport = useViewport();

    if(!items) return <></>;

    const parsedItems = items.map(item => {
        const itemValue = item.value

        let parsedValue;
        if(item.parsedValue) parsedValue = item.parsedValue;
        else if(typeof itemValue === "number") parsedValue = utils.toDisplayCurrency(itemValue).replace("$", "$ ");
        else if(typeof itemValue === "string") parsedValue = itemValue;
        else parsedValue = "-";
        return {...item, parsedValue: parsedValue};
    });

    const maxParsedItemLength = parsedItems.reduce((acc, item) => Math.max(acc, item.parsedValue.length), 0);
    const shouldDisplayAsList =
        (viewport.isInnerWidthBetween(0, 1050)) ||
        (viewport.isInnerWidthBetween(1201, 1300) && maxParsedItemLength >= 15) ||
        (viewport.isInnerWidthBetween(1301, 1400) && maxParsedItemLength >= 18);
    const shouldHideIcons = maxParsedItemLength >= 19 && viewport.innerWidth >= 1401;

    const classList = !shouldDisplayAsList ?
        `flex flex-row gap-3` :
        `flex flex-col gap-2`;

    return (
        <div className={`info-cards ${classList}`}>
            {parsedItems && parsedItems.map((item, index) => {
                if(item.type === "card") return <InfoCard item={item} key={index}/>
                else if(item.type === "icon" && !shouldHideIcons) return <InfoCardIcon item={item} key={index} shouldDisplayAsList={shouldDisplayAsList}/>
                else return <></>
            })}
        </div>
    );
}

function InfoCard({ item } : InfoCardWidgetProps) {
    return (
        <div className={`flex flex-col bg-muted/10 rounded items-center flex-1 gap-1 p-4 px-6`}>
            <span className={`text-xs md:text-sm block`}>{item.label}</span>
            <span className={`text-2xl font-bold font-ubuntu whitespace-nowrap ${item.color}`}>{item.parsedValue}</span>
        </div>
    );
}

function InfoCardIcon({ item, shouldDisplayAsList } : InfoCardWidgetProps) {
    const classList = !shouldDisplayAsList ?
        `flex items-center` :
        `hidden`;

    return (
        <div className={`${classList}`}>
            <i className={`${item.value} text-sm md:text-base`}></i>
        </div>
    );
}