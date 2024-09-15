export const useUtils = () => {
    /** @return {number} */
    const clamp = (value, min, max) => {
        return Math.min(Math.max(value, min), max)
    }

    /** @return {string} */
    const cleanNumericInputString = (string, minValue, maxValue, maxDecimals, shouldAlwaysForceParsedValue) => {
        const regex = maxDecimals > 0 ? /[^0-9.,]/g : /[^0-9]/g

        let cleanedValue = string.replace(regex, '')
        if(cleanedValue.length === 0) {
            return ''
        }

        // Checking decimals...
        const firstDecimalIndex = cleanedValue.indexOf('.')
        if (firstDecimalIndex !== -1) {
            // Allow only the first occurrence of '.' and remove the rest
            const beforeDecimal = cleanedValue.slice(0, firstDecimalIndex + 1)
            const afterDecimal = cleanedValue.slice(firstDecimalIndex + 1).replace(/\./g, '').replace(/,/g, '')
            cleanedValue = beforeDecimal + afterDecimal.slice(0, maxDecimals)
        }

        // Parse to number and clamp...
        const parsedValue = Number(cleanedValue.replaceAll(',', ''))
        const clampedParsedValue = clamp(parsedValue, minValue, maxValue)

        // Force clamped parsed value to the field...
        if(parsedValue !== clampedParsedValue || shouldAlwaysForceParsedValue) {
            cleanedValue = clampedParsedValue.toFixed(maxDecimals)
        }

        // Add commas every three characters for the integer part
        if(maxDecimals > 0) {
            cleanedValue = addThousandsSeparator(cleanedValue)
        }

        return cleanedValue.toString()
    }

    /** @return {string} */
    const toDisplayCurrency = (number) => {
        const stringNumber = number.toFixed(2)
        const prefix = '$'
        const stringNumberWithSeparator = addThousandsSeparator(stringNumber)
        return prefix + ' ' + stringNumberWithSeparator
    }

    /** @return {string} */
    const addThousandsSeparator = (numString) => {
        const split = numString.split('.')
        let integerPart = split[0].replaceAll(',', '')
        let decimalPart = split[1]

        let formattedIntegerPart = ''
        let charCount = 0
        for(let i = integerPart.length - 1 ; i >= 0 ; i--) {
            formattedIntegerPart = integerPart.charAt(i) + formattedIntegerPart
            charCount++
            if(charCount % 3 === 0) {
                formattedIntegerPart = ',' + formattedIntegerPart
            }
        }

        if(formattedIntegerPart.charAt(0) === ',')
            formattedIntegerPart = formattedIntegerPart.slice(1, formattedIntegerPart.length)
        return formattedIntegerPart + (decimalPart !== undefined ? '.' + decimalPart : '')
    }

    /** @return {number} */
    const convertMonthsToYears = (months, forceRound) => {
        const years = months/12
        if(forceRound)
            return Math.round(years)
        return years
    }

    /** @return {number} */
    const convertYearsToMonths = (years) => {
        return years*12
    }

    /** @return {number} */
    const roundMonthsToNearestYear = (months) => {
        const years = convertMonthsToYears(months, true)
        return convertYearsToMonths(years)
    }

    /** @return {string} */
    const getBootstrapColor = (colorName) => {
        const root = document.documentElement
        return getComputedStyle(root).getPropertyValue('--bs-' + colorName).trim()
    }

    /** @return {string} */
    const abbreviateNumber = (number) => {
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
            return number >= item.value
        })

        return item ? (number / item.value).toFixed(1).replace(/\.0$/, '') + item.symbol : "0"
    }

    return {
        clamp,
        cleanNumericInputString,
        toDisplayCurrency,
        addThousandsSeparator,
        convertMonthsToYears,
        convertYearsToMonths,
        roundMonthsToNearestYear,
        getBootstrapColor,
        abbreviateNumber
    }
}