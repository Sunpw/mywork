import axios from 'axios';
let getUrl = 'https://apiproposal.topjoy.com/v1/questions';
let postUrl='https://apiproposal.topjoy.com/v1/questionnaire';
export const requestQuestion = (params) => { return axios.get(`${getUrl}`, { params: params }).then(res => res.data).catch(res => res.data); };
export const postQuestion = (params) => { return axios.post(`${postUrl}`, params).then(res => res.data).catch(res => res.data); };
