import {useStrings} from "@/hooks/strings.tsx";

export const useNavigation = () => {
    const strings = useStrings();
    const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');

    const getContactLinks = () => {
        return CONTACT_LINKS.map(link => {
            return _parseLink(link);
        });
    };

    const getExternalLinks = () => {
        return EXTERNAL_LINKS.map(link => {
            return _parseLink(link);
        });
    };

    const getNavLinks = () => {
        return NAV_LINKS.map(link => {
            return _parseLink(link);
        });
    };

    const _parseLink = (link: { label?: string; href: string; icon: string; key?: string; }) => {
        const href = link.href.startsWith("http") ?
            link.href :
            resolvePath(link.href);

        const parsedLink = {
            href: href,
            icon: link.icon,
            label: ""
        };

        if(link.label) parsedLink.label = link.label;
        else if(link.key) parsedLink.label = strings.get(link.key);
        else parsedLink.label = link.href;
        return parsedLink;
    };

    const resolvePath = (relativePath: string):string => {
        let path = basePath + "/" + relativePath;
        path = path.replaceAll("///", "/")
            .replaceAll("//", "/");
        return path;
    };

    return {
        getContactLinks,
        getExternalLinks,
        getNavLinks,
        resolvePath
    };
}

const CONTACT_LINKS = [
    {
        label: "ryanbalieiro@icloud.com",
        href: "mailto:ryanbalieiro@icloud.com",
        icon: "pi pi-envelope"
    }
];

const EXTERNAL_LINKS = [
    {
        key: "strings.github",
        href: "https://github.com/ryanbalieiro",
        icon: "pi pi-github"
    },
    {
        key: "strings.personal_website",
        href: "https://ryanbalieiro.com",
        icon: "pi pi-globe"
    },
    {
        key: "strings.telegram",
        href: "https://telegram.me/ryanbalieiro",
        icon: "pi pi-telegram"
    },
];

const NAV_LINKS = [
    {
        key: "strings.home",
        href: "/",
        icon: "pi pi-home"
    },
    {
        key: "strings.instructions",
        href: "/tutorial",
        icon: "pi pi-book"
    },
    {
        key: "strings.about",
        href: "/about",
        icon: "pi pi-info-circle"
    },
    {
        key: "strings.repo",
        href: "https://github.com/ryanbalieiro/react-compound-interest-calculator",
        icon: "pi pi-github"
    }
];