// import { createContext, useEffect, useReducer, useContext } from 'react';
// import secondReducer from '@/reducers/secondReducer';
// import { useErc20Hook } from './Erc20Context';

// const initialState = {
//   stateOne: undefined,
// };

// function getInitialState(key: string) {
//   if (typeof window !== 'undefined') {
//     const state = window.localStorage.getItem(key);
//     return state || initialState;
//   }
// }

// export const SecondContext = createContext(getInitialState('seconds'));

// export const SecondProvider = ({ children }: any) => {
//   const [state, dispatch] = useReducer(secondReducer, initialState);
//   const { contract } = useErc20Hook();

//   useEffect(() => {
//     window.localStorage.setItem('seconds', state);
//   }, [state]);

//   useEffect(() => {
//     retrieveSeconds();
//   }, []);
//   // Can you call another hook here?

//   async function retrieveSeconds() {
//     console.log('retrieving seconds', contract);
//     // const seconds = await getSeconds();
//     const seconds: any[] = [];

//     dispatch({
//       type: 'RETRIEVE_SECONDS',
//       seconds,
//     });
//   }

//   const value = {
//     stateOne: state.contract,
//   };

//   return (
//     <SecondContext.Provider value={value}>{children}</SecondContext.Provider>
//   );
// };
