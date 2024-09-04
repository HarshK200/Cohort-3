interface OnboardingOptsComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
}

interface SelectBlockchainProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
  selectedBlockhain: supportedBlockchains;
  setSelectedBlockchain: React.Dispatch<React.SetStateAction<supportedBlockchains>>;
}
interface BlockchainContainerProps extends SelectBlockchainProps {
  blockchain: { name: supportedBlockchains; logo: any };
}

interface MnemonicsComponentProps {
  setCurrentComponent: React.Dispatch<React.SetStateAction<number>>;
  currentComponent: number;
  mnemonic: string[] | undefined;
}

interface MnemonicComponentProps {
  mnemonic: string;
}

interface CreatePassCompProps {
  mnemonic: string[] | undefined;
  selectedBlockhain: supportedBlockchains;
}

interface getEncryptedMnemonicReqData {
  password: React.MutableRefObject<string | undefined>;
  mnemonic: string[];
}

interface wallet {
  wallet_id: number;
  blockchain_type: supportedBlockchains; // would be somthing like [Solana, Etherium]
  public_key: string;
  encrypted_private_key: string;
}

interface secureUser {
  // also called an account
  accountId: number;
  encryptedMnemonic: string;
  wallets: wallet[];
}

interface recentActiveSessionInfo {
  active_accountId: number;
  active_wallet: wallet;
}

interface generatemnemonic_ResponseData {
  mnemonic: string[];
}

interface generateAccount_RequestData {
  nextAvilAccountId: number;
  mnemonic: string[];
  password: string;
  blockchain_type: supportedBlockchains;
}

interface generateAccount_ResponseData extends secureUser {}

interface getaccountinfo_RequestData {
  jsonrpc: string;
  id: number;
  method: string;
  params: string[];
}

interface AccountComponentProps {
  user: secureUser;
  activeSession: recentActiveSessionInfo;
  setActiveSession: React.Dispatch<React.SetStateAction<recentActiveSessionInfo | undefined>>;
}

interface decryptprivatekey_RequestData {
  encrypted_private_key: string;
  password: string;
}

interface WalletContainerComponenetProps {
  wallet: wallet;
  activeSession: recentActiveSessionInfo;
  setActiveSession: React.Dispatch<React.SetStateAction<recentActiveSessionInfo | undefined>>;
  password: React.MutableRefObject<string | undefined>;
  setPassPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passPopupCallback: React.MutableRefObject<((password: React.MutableRefObject<string>) => void) | undefined>;
}

interface EnterPassPopupProps {
  password: React.MutableRefObject<string | undefined>;
  handleEnterPassSubmit: () => Promise<void>;
  loading: boolean;
}

interface generateWallet_RequestData {
  blockchain_type: supportedBlockchains;
  password: string;
  encryptedMnemonic: string;
  nextAvilWalletId: number;
}

interface walletActioBtnsComponentProps {
  password: React.MutableRefObject<string | undefined>;
  setPassPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setActiveSession: React.Dispatch<React.SetStateAction<recentActiveSessionInfo | undefined>>;
  setSendMoneyPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  passPopupCallback: React.MutableRefObject<(() => void) | undefined>;
}

interface SendMoneyPopup {
  password: React.MutableRefObject<string | undefined>;
  setSendMoneyPopupOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeSession: recentActiveSessionInfo;
  balance: number;
}

interface sendSol_RequestData {
  password: string;
  sender_pubkey: string;
  sender_encryptedPrivatekey: string;
  reciever_publicKey: string;
  amount: number;
}
