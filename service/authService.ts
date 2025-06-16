import { setToken } from "@/utils/authUtils";
import axios from "axios";

export async function login(email: string, password: string) {
  const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
    email,
    password,
  });

  setToken(res.data.access_token);
  return res.data;
}

// export async function getProfile(token: string) {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
//     {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
//   return res.data;
// }
