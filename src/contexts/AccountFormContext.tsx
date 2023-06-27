import { ReactNode, createContext, useState } from "react";

export type AccountProps = {
  name?: string;
  email?: string;
  phone?: string;
  birth?: string;
  password?: string;
  passwordConfirmation?: string;
};

type AccountFormContextDataProps = {
  accountFormData: AccountProps;
  updateFormData: (value: AccountProps) => void;
};

type AccountFormContextProviderProps = {
  children: ReactNode;
};

export const AccountFormContext = createContext<AccountFormContextDataProps>(
  {} as AccountFormContextDataProps
);

export function AccountProvider({ children }: AccountFormContextProviderProps) {
  const [accountFormData, setAccountFormData] = useState<AccountProps>(
    {} as AccountProps
  );

  function updateFormData(data: AccountProps) {
    setAccountFormData((prevState) => ({ ...prevState, ...data }));
  }

  return (
    <AccountFormContext.Provider value={{ accountFormData, updateFormData }}>
      {children}
    </AccountFormContext.Provider>
  );
}
