import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.calculator',
  appName: 'Calculator',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  },
  plugins: {
    StatusBar: {
      style: 'dark',
      backgroundColor: '#667eea',
      overlay: true,
    },
    SplashScreen: {
      launchShowDuration: 0,
      backgroundColor: '#667eea',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    }
  }
};

export default config;