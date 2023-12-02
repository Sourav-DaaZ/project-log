import dynamicLinks from '@react-native-firebase/dynamic-links';
import { quaryData } from '../../utils';

export const generateLink = async (shortLink, param, value) => {
    try {
        const url = await dynamicLinks().buildShortLink({
            link: `https://yarifi.page.link/${shortLink}/?${param}=${value}`,
            // ios: {
            //     bundleId: '',
            //     appStoreId: '',
            //     // fallbackUrl: 'http://localhost:8081',
            // },
            android: {
                packageName: 'com.yarifi',
                // fallbackUrl: 'http://localhost:8081',
            },
            domainUriPrefix: 'https://yarifi.com',
        });
        return url;
    } catch (e) {
        return ''
    }
}

export const handleDynamicLink = (link, navigation) => {
    try {
        if (link?.url) {
            const url = quaryData(link.url);
            if (url?.page && url?.id) {
                navigation?.navigate(url.page, { id: url.id, name: url.name });
            } else if (url?.page) {
                navigation?.navigate(url.page);
            }
        }
    } catch (e) {
        console.log(e)
    }
};

export const handleOnloadDynamicLink = (link, navigation) => {
    try {
        dynamicLinks()
            .getInitialLink()
            .then(links => {
                let varLink = link;
                if (links) {
                    varLink = links
                }
                if (varLink?.url) {
                    const url = quaryData(varLink.url);
                    if (url.page && url.id) {
                        navigation?.navigate(url.page, { id: url.id, name: url.name });
                    } else if (url.page) {
                        navigation?.navigate(url.page);
                    }
                }
            });
    } catch (e) {
        console.log(e)
    }
};

export const buildLink = async (dataUrl) => {
    try {
        const link = await dynamicLinks().buildShortLink({
            link: dataUrl,
            domainUriPrefix: 'https://yarifi.page.link',
            android: {
                packageName: 'com.yarifi',
            },
            navigation: {
                forcedRedirectEnabled: true,
            },
        }, dynamicLinks.ShortLinkType.UNGUESSABLE);

        return link;
    } catch (e) {
        return ''
    }
}