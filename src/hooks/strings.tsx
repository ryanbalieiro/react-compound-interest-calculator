export const useStrings = () => {
    const get = (key: string, linkClass: string = "custom-primary-link"):string => {
        const parsedKey = key.replaceAll("strings.", "");
        const entry:string = STRINGS_MAP[parsedKey];

        if(!entry) return `string.${parsedKey}`;

        let parsedEntry = entry;
        parsedEntry = parsedEntry.replace(/\[\[\[(.+?)]]]/g, "<em>$1</em>");
        parsedEntry = parsedEntry.replace(/\[\[(.+?)]]/g, "<strong>$1</strong>");

        parsedEntry = parsedEntry.replace(/\{link:([^}]+)}/g, (_m, linkKey: string) => {
            const info = LINKS_MAP[linkKey];
            if (!info) return `{link:${linkKey}}`;
            const text = get(info.key || "link");
            return `<a href="${info.href}" target="_blank" class="${linkClass}">${text}</a>`;
        });

        parsedEntry = parsedEntry.replace(/\{year}/g, PARAMETERS_MAP.year);
        return parsedEntry;
    };

    return {
        get
    };
}

const STRINGS_MAP: Record<string, string> = {
    /** -------------------- TERMS AND EXPRESSIONS ---------------- **/
    about: "About",
    amount: "Amount",
    around_the_web: "Around the Web",
    brand_lead_label: "Compound [[Interest]]",
    brand_sub_label: "Calculator",
    calculate: "Calculate",
    chart_js: "Chart.js",
    clear: "Clear",
    contact_info: "Contact Info",
    developer_name: "Ryan Balieiro",
    disclaimer_note: "Disclaimer Note",
    distribution: "Distribution",
    earned_interest: "Earned Interest",
    estimated_total: "Estimated Total",
    evolution: "Evolution",
    github: "GitHub",
    go_back_home: "Back to Home",
    home: "Home",
    investment_details: "Investment Details",
    instructions: "Instructions",
    license: "License",
    mit_license: "MIT License",
    not_found: "Not Found",
    personal_website: "Personal Website",
    prime_icons: "Prime Icons",
    react: "React",
    react_router_dom: "React Router",
    repo: "Repo",
    simulate_now: "Simulate Now",
    table: "Table",
    tailwindcss: "Tailwind",
    technical_info: "Technical Info",
    telegram: "Telegram",
    total: "Total",
    total_contributed: "Total Contributed",
    total_interest: "Total Interest",
    total_invested: "Total Invested",
    vite: "Vite",

    period_month_each: "Per Month",
    period_month_end: "End of Month",
    period_month_percentage: "% Monthly",
    period_month_plural: "Months",
    period_month_singular: "Month",
    period_year_each: "Per Year",
    period_year_end: "End of Year",
    period_year_percentage: "% Yearly",
    period_year_plural: "Years",
    period_year_singular: "Year",

    /** -------------------------- MESSAGES ---------------------- **/
    about_page_msg_subtitle: "Learn more about the project.",
    about_page_msg_description: "This calculator is an open source project that is licensed under the {link:mit}. This allows you to do pretty much anything you want as long as you include the copyright in “all copies or substantial portions of the Software.” Attribution is not required (though very much appreciated).",
    about_page_msg_technical_info_description: "This project was made possible using the following libraries and frameworks:",
    about_page_msg_framework_description_chart_js: "{link:chart_js} – A flexible JavaScript library for creating charts.",
    about_page_msg_framework_description_prime_icons: "{link:prime_icons} – A rich icon library for modern web applications.",
    about_page_msg_framework_description_react: "{link:react} – A popular JavaScript library for building UIs.",
    about_page_msg_framework_description_react_router_dom: "{link:react_router_dom} – A library for routing and navigation in React applications.",
    about_page_msg_framework_description_tailwind: "{link:tailwindcss} – A utility-first CSS framework for building modern UIs.",
    about_page_msg_framework_description_vite: "{link:vite} – A fast and modern development build tool.",
    about_page_msg_license_description: "Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:",
    about_page_msg_license_content: "The software is provided “as is”, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.",
    about_page_msg_disclaimer_part_1: "The work is made available to you in its current state, without any warranties, guarantees, or assurances of its performance or suitability for any specific purpose. This means that the work is provided \"as is,\" and you are advised to use it with a comprehensive understanding of its inherent characteristics and limitations. The absence of warranties implies that the author does not take on the responsibility of ensuring the work's error-free functioning, stability, or fitness for particular applications.",
    about_page_msg_disclaimer_part_2: "It is important to emphasize that the principle of providing the work \"as is\" is not an attempt to undermine its value or quality. Rather, it underscores the reality that software and creative works can vary in terms of performance, compatibility, and outcomes due to the diverse environments and contexts in which they are used. While the author has undoubtedly put effort into crafting a functional and reliable tool, the inherent complexities of technology and the diversity of user scenarios can influence the work's behavior in unpredictable ways.",

    calculator_distribution_explanation: "{c} of your final balance came from contributions and {i} came from interest.",
    calculator_input_description_currently_saved: "How much do you have [[saved currently?]]",
    calculator_input_description_extra_contributions: "How much extra will you [[contribute]]?",
    calculator_input_description_rate_of_return: "What's the expected [[rate of return?]]",
    calculator_input_description_time: "How much [[time]] will you save for?",

    error_page_msg_404: "Oops! Looks like you're lost.",
    error_page_msg_unavailable: "Sorry, this page is unavailable.",
    error_page_msg_unavailable_description: "The link you followed may be [[broken]], [[expired]], or [[unavailable]]; it may have been [[moved]], [[renamed]], or [[removed]], or you may lack the required [[permission]] to access it. Please [[[check the URL]]], try [[[refreshing]]], or return to the homepage.",

    feedback_type_no_data: "You need to fill in <b>all required fields</b> to generate the report.",
    feedback_type_required_field: "This field is required!",

    footer_msg_about: `This project is maintained by Ryan Balieiro and is based on the {link:react} framework and the {link:tailwindcss} framework.`,
    footer_msg_contact_details: `If you wish to contact me, you can reach me out through the following options:`,
    footer_msg_copyright: `Copyright ©{year} {link:developer} – Distributed Under the MIT License.`,

    home_page_msg_subtitle: "Find out how your investment will grow over time:",
    home_page_note: "For the purpose of this calculation, we assume compounding occurs at the [[end of each month]]. If you enter an [[annual return rate]], it will still compound [[monthly]], but in a way that ensures the total compounding equals the given annual rate by the end of each year.",

    instructions_page_msg_subtitle: "How to use the calculator:",
    instructions_page_description_title: "What is compound interest?",
    instructions_page_description_part_1: "Compound interest is when the interest you earn, earns interest. It helps boost the growth of your money over time.",
    instructions_page_description_part_2: "The formula for calculating the final value of an investment that's compounded is:",
    instructions_page_formula_explanation_title: "In this equation:",
    instructions_page_formula_explanation_item_1: "[[P]] is the initial investment.",
    instructions_page_formula_explanation_item_2: "[[r]] is the interest rate.",
    instructions_page_formula_explanation_item_3: "[[t]] is the time the money stays invested.",
    instructions_page_how_to_title: "How to calculate your estimated future savings?",
    instructions_page_how_to_description: "Calculating compound interest for your finances is a [[[breeze]]] with this tool:",
    instructions_page_step_by_step_1: "Type in how much you [[currently]] have saved.",
    instructions_page_step_by_step_2: "Select how much [[extra]] you’ll save and how [[often]] you’ll be adding that extra contribution.",
    instructions_page_step_by_step_3: "Enter your [[expected interest rate]] into the calculator.",
    instructions_page_step_by_step_4: "Decide on a [[timeline]] for your savings plan.",
    instructions_page_step_by_step_5: "Press [[[Calculate]]] to create the report.",
    instructions_page_how_to_note: "It's important to note that any results or calculations displayed on this tool are made available for information purposes only, and do not constitute financial or legal advice.",
    instructions_page_example_title: "Example scenario",
    instructions_page_example_description: "Imagine you start with an initial investment of [[{i}]], and you add [[{m}]] every month at a [[{p}]] annual interest rate for [[{y}]] years:",
    instructions_page_example_note: "For the scenario above, your estimated savings would be {t} – with {c} coming from contributions and {i} from interest. This calculation assumes that your investment earns interest income that compounds at the end of each month."
}

const LINKS_MAP: Record<string, { href: string; key?: string; }> = {
    chart_js: {href: "https://www.chartjs.org/", key: "chart_js"},
    developer: {href: "https://ryanbalieiro.com/", key: "developer_name"},
    mit: {href: "https://opensource.org/license/MIT", key: "mit_license"},
    prime_icons: {href: "https://www.primefaces.org/primeicons/", key: "prime_icons"},
    react: {href: "https://reactjs.org/", key: "react"},
    react_router_dom: {href: "https://reactrouter.com/", key: "react_router_dom"},
    tailwindcss: {href: "https://tailwindcss.com/", key: "tailwindcss"},
    vite: {href: "https://vitejs.dev/", key: "vite"},
}

const PARAMETERS_MAP = {
    year: new Date().getFullYear().toString()
}