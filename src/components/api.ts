import axios from "axios";
import Cookies from "js-cookie";
import { IUserDataSaveData } from "./KakaoLogin";
import qs from "qs";
interface IFetchedData {
  password: string;
  email: string;
  token: string;
}

/** Example to use fetchData 
 * 
 *  const fetchDataAsync = async () => {
    const data = {
      email: "yjs6300@kakao.com",
      password: "00000000",
    };
    const fetchedData = await fetchData(data);
  }; */
export const postDataAuth = async (
  data: object
): Promise<IFetchedData | null> => {
  try {
    const response = await axios.post(
      "https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app/users/auth",
      data
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const postInsertUserData = async (data: object) => {
  try {
    const response = await axios.post(
      `https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app/users/insert`,
      data
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const putUserData = async (
  userData: IUserDataSaveData,
  email: string
) => {
  try {
    const response = await axios.put(
      `https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app/users/${email}`,
      {
        username: userData.nickname,
        phone: userData.phone,
        cities_code: userData.cities_code,
        address: userData.address,
        profile_image: userData.profile_image, //밑 두가지를 포함하면 데이터 추가가 실패된다.
        // birthday: userData.birthday,
        // gender: userData.gender,
      }
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

interface iContents {
  email: string;
  title: string;
  content: string;
  image: string;
}
export const postContents = async (contents: iContents) => {
  try {
    const response = await axios.post(
      `https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app/users/post`,
      contents
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};

export interface iReadPost {
  id: string;
}
export const readPost = async (data: iReadPost) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app/users/readPost",
    headers: {
      "Content-Type": "application/json",
    },
    params: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

export interface iReadPosts {
  start: string;
  listn: string;
}
export const readPosts = async (data: iReadPosts) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app/users/readPosts",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: data,
  };
  axios
    .request(config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};
