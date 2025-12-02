import {useNavigation} from "@/hooks/navigation.tsx";
import {Route, Routes, useLocation} from 'react-router-dom';
import AppPageHome from "@/components/pages/AppPageHome.tsx";
import AppPageNotFound from "@/components/pages/AppPageNotFound.tsx";
import AppPageInstructions from "@/components/pages/AppPageInstructions.tsx";
import AppPageAbout from "@/components/pages/AppPageAbout.tsx";
import {useEffect} from "react";

export default function RouterView() {
    const navigation = useNavigation();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }, [location.pathname]);

    return (
        <Routes>
            <Route path={navigation.resolvePath("/")} element={<AppPageHome/>}/>
            <Route path={navigation.resolvePath("/tutorial")} element={<AppPageInstructions/>}/>
            <Route path={navigation.resolvePath("/about")} element={<AppPageAbout/>}/>
            <Route path="*" element={<AppPageNotFound/>}/>
        </Routes>
    );
}