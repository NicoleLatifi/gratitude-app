// This module creates and exports a singleton instance of the app
// so that the app can be accessed outside of a functional React component
// Otherwise, the app can only be accessed with the useApp() hook within a functional React component

import Realm from 'realm';
import { APP_ID } from '@env'

const app = new Realm.App({ id: APP_ID });

export default app;
