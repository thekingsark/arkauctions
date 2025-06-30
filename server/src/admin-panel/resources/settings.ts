import { Settings } from '../../modules/settings/model.js'
import { customComponents } from '../component-loader.js'

export const createSettingsResource = () => {
  return {
    resource: Settings,
    options: {
      properties: {
        defaultCurrencyId: {
          components: {
            show: customComponents.JsonbField,
            list: customComponents.JsonbFieldList,
            edit: customComponents.SimpleInput,
          },
        },
        vapidPrivateKey: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },

        stripeSecretKey: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        stripeWehookSigningSecret: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        paypalClientId: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        paypalClientSecret: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        razorpayKeyId: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        razorpaySecretKey: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        razorpayWebhookSecret: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        googleCloudStorageBucket: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        awsAccessKeyId: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        awsSecretAccessKey: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        awsStorageBucket: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        awsStorageRegion: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        googleMapsApiKey: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
        openAiApiKey: {
          custom: {
            role: 'admin',
            defaultValue: 'a secret',
          },
        },
      },
      navigation: {
        name: 'Settings',
        icon: 'Settings',
      },
      actions: {
        new: {
          isVisible: false,
          isAccessible: false,
        },
        edit: {
          isAccessible: ({ currentAdmin }) => currentAdmin.role === 'admin',
          component: customComponents.SettingsEditPage,
        },
        bulkDelete: {
          isAccessible: false,
        },
        filter: {
          isVisible: false,
          isAccessible: false,
        },
        delete: {
          isVisible: false,
          isAccessible: false,
        },
      },
      listProperties: [
        'appName',
        'defaultCurrencyId',
        'auctionActiveTimeInHours',
        'maxProductPrice',
        'promotionCoinsCost',
      ],
      showProperties: [
        'appName',
        'googleMapsApiKey',
        'defaultCurrencyId',
        'auctionActiveTimeInHours',
        'maxAllowedDistanceBetweenUsersInKM',
        'maxProductPrice',
        'promotionCoinsCost',
        'allowValidationRequest',
        'defaultProductImageUrl',
        'freeAuctionsCount',
        'freeBidsCount',
        'auctionsCoinsCost',
        'bidsCoinsCost',
        'automaticallyAcceptBidOnAuctionClose',
        'emailValidationEnabled',
        'allowUnvalidatedUsersToCreateAuctions',
        'allowUnvalidatedUsersToCreateBids',
        'allowAnonymousUsersToCreateAuctions',
        'allowAnonymousUsersToCreateBids',
        'allowMultipleCurrencies',
        'googlePlayLink',
        'appStoreLink',
        'confidentialityLink',
        'revenueCatAndroidKey',
        'revenueCatIOSKey',
        'adsEnabledOnAndroid',
        'adsEnabledOnIOS',
        'androidAdsBannerId',
        'androidAdsInterstitialId',
        'androidAdsRewardedId',
        'iosAdsBannerId',
        'iosAdsInterstitialId',
        'iosAdsRewardedId',
        'webAppUrl',
        'accountPageLayout',
        'profilePageLayout',
        'vapidPrivateKey',
        'vapidPublicKey',
        'vapidSupportEmail',
        'stripeSecretKey',
        'stripeWehookSigningSecret',
        'paypalClientId',
        'paypalClientSecret',
        'razorpayKeyId',
        'razorpaySecretKey',
        'razorpayWebhookSecret',
        'googleCloudStorageBucket',
        'awsAccessKeyId',
        'awsSecretAccessKey',
        'awsStorageBucket',
        'awsStorageRegion',
        'openAiApiKey',
        'allowAiResponsesOnUnvalidatedEmails',
        'freeAiResponses',
        'aiResponsesPriceInCoins',
        'maxAiResponsesPerUser',
      ],
      editProperties: [
        'appName',
        'defaultCurrencyId',
        'auctionActiveTimeInHours',
        'maxAllowedDistanceBetweenUsersInKM',
        'maxProductPrice',
        'promotionCoinsCost',
        'allowValidationRequest',
        'defaultProductImageUrl',
        'confidentialityLink',
        'revenueCatAndroidKey',
        'revenueCatIOSKey',
        'adsEnabledOnAndroid',
        'adsEnabledOnIOS',
        'androidAdsBannerId',
        'androidAdsInterstitialId',
        'androidAdsRewardedId',
        'iosAdsBannerId',
        'iosAdsInterstitialId',
        'iosAdsRewardedId',
        'freeAuctionsCount',
        'freeBidsCount',
        'auctionsCoinsCost',
        'bidsCoinsCost',
        'automaticallyAcceptBidOnAuctionClose',
        'accountPageLayout',
        'profilePageLayout',
        'googlePlayLink',
        'appStoreLink',
        'emailValidationEnabled',
        'allowUnvalidatedUsersToCreateAuctions',
        'allowUnvalidatedUsersToCreateBids',
        'allowAnonymousUsersToCreateAuctions',
        'allowAnonymousUsersToCreateBids',
        'allowMultipleCurrencies',
        'openAiApiKey',
        'allowAiResponsesOnUnvalidatedEmails',
        'freeAiResponses',
        'aiResponsesPriceInCoins',
        'maxAiResponsesPerUser',
      ],
    },
  }
}
