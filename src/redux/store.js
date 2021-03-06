import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsSlice } from './contacts/slice';
import { filterSlice } from './filter/slice';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
];

const contactsPersistConfig = {
  key: 'contacts',
  storage,
  blacklist: ['filter'],
};

const persistedReducer = persistReducer(
  contactsPersistConfig,
  combineReducers({
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  })
);

export const store = configureStore({
  reducer: {
    contacts: persistedReducer,
  },
  middleware,
});

export const persistor = persistStore(store);
