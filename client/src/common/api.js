/*
 * @Author: Guru
 * @Date: 2018-02-28 16:50:42
 * @Last Modified by: Pulkit Aggarwal
 */
const baseURL = "http://localhost:3001";

// import Config from '@/Common/Config';

const URLS = {
  postEvent: `${baseURL}/api/postlist`,
  getEvent : `${baseURL}/api/getlist`,
  filterDiscount : `${baseURL}/api/filterDiscount`
};

export default URLS;
