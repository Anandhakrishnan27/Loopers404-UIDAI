import axios from 'axios';


class UidaiApiService 
{
generarteCaptcha(body)
{
     return axios.post("https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/get/captcha",body);
}
generateOTP(body,headers)
{
     return axios.post("https://stage1.uidai.gov.in/unifiedAppAuthService/api/v2/generate/aadhaar/otp",body,headers);
     
}
fetchEkyc(body,headers)
{
     return axios.post("https://stage1.uidai.gov.in/eAadhaarService/api/downloadOfflineEkyc",body,headers);
}
}
export default new UidaiApiService()