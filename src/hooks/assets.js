export const useAssets = () => {
    const BASE_URL = import.meta.env.BASE_URL.replace(/\/$/, '')
    const PUBLIC_FOLDER_LOGO_PATH = '/icon.svg'

    const resolvePath = (path) => {
        return BASE_URL + path
    }

    const getLogo = () => {
        return resolvePath(PUBLIC_FOLDER_LOGO_PATH)
    }

    return {
        resolvePath,
        getLogo
    }
}