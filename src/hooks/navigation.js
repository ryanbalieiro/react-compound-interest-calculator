import { useState } from 'react'
import { useLocation } from "react-router-dom"
import { faHome, faInfoCircle, faChalkboardUser } from '@fortawesome/free-solid-svg-icons';
import {faGithub} from "@fortawesome/free-brands-svg-icons"
import {useAssets} from "/src/hooks/assets.js"

export const useNavigation = () => {
    const assets = useAssets()
    const location = useLocation()

    const repoUrl = 'https://ryanbalieiro.github.io/compound-interest-calculator/'

    const [navLinks] = useState([
        {
            name: 'Home',
            url: assets.resolvePath('/'),
            icon: faHome
        },

        {
            name: 'Instructions',
            url: assets.resolvePath('/tutorial'),
            icon: faChalkboardUser
        },

        {
            name: 'About',
            url: assets.resolvePath('/about'),
            icon: faInfoCircle
        },

        {
            name: 'Repo',
            url: repoUrl,
            icon: faGithub
        }
    ])

    const isActive = (url) => {
        const pathName = location.pathname.replace(/\/$/, '')
        url = url.replace(/\/$/, '')
        return pathName === url
    }

    const getRepoUrl = () => {
        return repoUrl
    }

    const isUrlExternal = (url) => {
        return url.includes('https://')
    }

    return { navLinks, isActive, getRepoUrl, isUrlExternal }
}