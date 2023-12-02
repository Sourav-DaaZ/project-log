
import React, { useState } from 'react';
import { View } from "react-native";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

const Admob = (props) => {
    const [show, setShow] = useState(true);
    return (
        show ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <BannerAd
                unitId={props.id}
                size={BannerAdSize.BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                    keywords: ['finance', 'education'],
                }}
                onAdFailedToLoad={error => setShow(false)}
            />
        </View> : null
    );
}

export default Admob;