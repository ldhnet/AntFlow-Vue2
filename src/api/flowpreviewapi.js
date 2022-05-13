import request from '@/utils/request.js'; 
export const getTestData = () => {
  return request({
    url: '/userData.json ',
    method: 'get',
  });
};
 