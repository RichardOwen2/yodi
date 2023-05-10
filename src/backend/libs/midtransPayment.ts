import axios from "axios";
import type { MidtransTransactionPayload } from "@/types";

const SNAP_SANDBOX_BASE_URL = 'https://app.sandbox.midtrans.com/snap/v1';
const SNAP_PRODUCTION_BASE_URL = 'https://app.midtrans.com/snap/v1';

const _checkProduction = () => {
  return process.env.NODE_ENV === "production";
}

const _getApiUrl = () => {
  return _checkProduction() ? SNAP_PRODUCTION_BASE_URL : SNAP_SANDBOX_BASE_URL;
}

const _getServerKey = () => {
  return (_checkProduction() ? process.env.SERVER_KEY : process.env.SANBOX_SERVER_KEY) as string;
}

const _getAuth = () => {
  return Buffer.from(`${_getServerKey()}:`, 'base64')
}

export const ALLOWED_PAYMENT = [ "gopay", "other_va" ];

export const createTransaction = async (payload: MidtransTransactionPayload) => {
  const apiUrl = _getApiUrl();

  const response = await axios.post(apiUrl,
    payload,
    {
      headers: { "Authorization": `Basic ${_getAuth()}` }
    }
  );

  return response;
}