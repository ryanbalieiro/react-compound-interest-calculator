import Container from "@/components/layout/Container.tsx";
import Brand from "@/components/widgets/Brand.tsx";
import {useNavigation} from "@/hooks/navigation.tsx";
import {useViewport} from "@/components/providers/ViewportProvider.tsx";
import {Link, useLocation} from "react-router-dom";

export default function NavBar() {
    return (
        <nav className={`bg-primary w-[100%]`}>
            <Container>
                <div className={`flex items-center justify-between h-[80px]`}>
                    <Brand/>
                    <NavBarLinks/>
                </div>
            </Container>
        </nav>
    );
}

function NavBarLinks() {
    const navigation = useNavigation();
    const viewport = useViewport();

    const navLinks = navigation.getNavLinks();
    const shouldDisplayNavTabs = viewport.shouldDisplayNavTabs();
    const displayLinks = !shouldDisplayNavTabs ?
        navLinks :
        [navLinks[navLinks.length - 1]];

    return (
        <ul className="flex items-center gap-8">
            {displayLinks.map((link, index) => (
                <NavBarLink key={index}
                            href={link.href}
                            label={link.label}
                            icon={link.icon}/>
            ))}
        </ul>
    );
}

function NavBarLink({href = "", label = "", icon = ""}) {
    const location = useLocation();

    const locationPage = location.pathname.replace(/\/$/, '');
    const targetPage = href.replace(/\/$/, '');
    const isActive = locationPage === targetPage;
    const activeClass = isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100';

    return (
        <li>
            <Link to={href}
                  className={`text-white font-ubuntu ${activeClass} text-xl lg:text-base`}>
                <i className={`${icon} me-2`}/>
                <span className={`hidden lg:inline`}>{label}</span>
            </Link>
        </li>
    );
}