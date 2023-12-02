const config = {
    env: "dev",
    // env: "prod",
    dev: {
        buildVersion: {
            ios: 1.0,
            android: 1.0
        },
        minBuildVersion: {
            ios: 2.0,
            android: 1.0
        },
        updateDetails: {
            ios: '1. update, 2. cool',
            android: '1. Bug Fixes'
        },
        appUrl: {
            ios: '',
            android: ''
        },
        maintenance: {
            ios: false,
            android: false,
            msg: 'Please Try again after some time.'
        },
        link: {
            ios: '',
            android: '',
        }
    },
    prod: {
        buildVersion: {
            ios: 1.0,
            android: 1.0
        },
        minBuildVersion: {
            ios: 1.0,
            android: 1.0
        },
        updateDetails: {
            ios: '1. update, 2. cool',
            android: '1. Bug Fixes'
        },
        appUrl: {
            ios: '',
            android: ''
        },
        maintenance: {
            ios: false,
            android: false,
            msg: 'Please Try again after some time'
        },
        link: {
            ios: '',
            android: '',
        }
    },
};

module.exports = config;
