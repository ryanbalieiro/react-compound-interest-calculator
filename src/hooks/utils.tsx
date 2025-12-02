export const useUtils = () => {
    const abbreviateNumber = (number: number):string => {
        const abbreviations = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "M" },
            { value: 1E9, symbol: "B" },
            { value: 1E12, symbol: "T" },
            { value: 1E15, symbol: "P" },
            { value: 1E18, symbol: "E" },
        ];

        const item = abbreviations.slice().reverse().find(function(item) {
            return number >= item.value;
        })

        return item ?
            (number / item.value).toFixed(1).replace(/\.0$/, '') + item.symbol :
            "0";
    };

    const addThousandsSeparator = (numberString: string):string => {
        const split = numberString.split('.');
        let integerPart = split[0].replaceAll(',', '');
        let decimalPart = split[1];
        let formattedIntegerPart = '';
        let charCount = 0;

        for(let i = integerPart.length - 1 ; i >= 0 ; i--) {
            formattedIntegerPart = integerPart.charAt(i) + formattedIntegerPart;
            charCount++;
            if(charCount % 3 === 0) formattedIntegerPart = ',' + formattedIntegerPart;
        }

        if(formattedIntegerPart.charAt(0) === ',') formattedIntegerPart = formattedIntegerPart.slice(1, formattedIntegerPart.length);
        return formattedIntegerPart + (decimalPart !== undefined ? '.' + decimalPart : '');
    };

    const getTailwindColor = (colorName: string): string => {
        const root = document.documentElement;
        const value = getComputedStyle(root).getPropertyValue(`--color-${colorName}`);
        return value ? value.trim() : "";
    };

    const parseCurrencyForInput = (number?: number, allowDecimals?: boolean):string => {
        if(number === undefined) return "";
        const numberString = allowDecimals ? number.toFixed(2) : number.toString();
        return addThousandsSeparator(numberString);
    };

    const parsePercentageForInput = (decimalPercentage?: number):string => {
        if(decimalPercentage === undefined) return "";
        const actualPercentage = decimalPercentage * 100;
        return actualPercentage.toFixed(2);
    };

    const strIf = (condition: boolean, strIfTrue: string, strIfFalse: string = ''):string => {
        return condition ? strIfTrue : strIfFalse;
    };

    const toDisplayCurrency = (amount: number):string => {
        if(amount === undefined || isNaN(amount)) return "-";
        return amount.toLocaleString("en-US", {style: "currency", currency: "USD"});
    };

    const toDisplayPercentage = (decimalPercentage: number):string => {
        const formattedPercentage = decimalPercentage * 100;
        let parsedPercentage = formattedPercentage.toFixed(2);
        if(parsedPercentage.endsWith(".00")) parsedPercentage = parsedPercentage.slice(0, -3);
        return parsedPercentage + "%";
    };

    const toNumber = (value: string):number => {
        value = value.replaceAll(",", "");
        return Number(value);
    };

    return {
        abbreviateNumber,
        addThousandsSeparator,
        getTailwindColor,
        parseCurrencyForInput,
        parsePercentageForInput,
        strIf,
        toDisplayCurrency,
        toDisplayPercentage,
        toNumber
    };
}