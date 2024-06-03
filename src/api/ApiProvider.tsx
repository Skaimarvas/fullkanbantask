import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type Props = { children: React.ReactNode };

axios.defaults.baseURL = BASE_URL;

function ApiProvider({ children }: Props) {
  return <>{children}</>;
}

export default ApiProvider;
