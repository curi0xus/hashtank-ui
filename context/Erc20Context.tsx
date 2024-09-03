// import { createContext, useContext, useEffect, useReducer } from 'react';
// import erc20Reducer from '@/reducers/erc20Reducer';
// import { instantiateContract } from '@/actions/erc20';

// export const initialState = {
//   contract: undefined,
//   initiateContract: () => {},
// };

// export const Erc20Context = createContext(initialState);
// export const useErc20Hook = () => {
//   const erc20Context = useContext(Erc20Context);
//   return {
//     ...erc20Context,
//   };
// };

// export const Erc20Provider = ({ children }: any) => {
//   const [state, dispatch] = useReducer(erc20Reducer, initialState);

//   useEffect(() => {
//     initiateContract();
//   }, []);
//   // Can you call another hook here?

//   async function initiateContract() {
//     console.log('Network called once here');
//     dispatch(instantiateContract());
//   }

//   const value = {
//     contract: state.contract,
//     initiateContract,
//   };

//   return (
//     <Erc20Context.Provider value={value}>{children}</Erc20Context.Provider>
//   );
// };
