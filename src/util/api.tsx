import axios, { AxiosRequestConfig } from 'axios'
import { LatLngExpression } from 'leaflet';
import { ResponceBranches, ResponceCompany } from './interfaces';


const API = {
    getCoordinateByAddress: async (address:string) => 
        axios.get(`https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${address}&accept-language=ru`),
    getCompany: async () => {
        const {data, status} = await axios.get(`http://v584337.hosted-by-vdsina.ru/api/get/companies`);
        return {
            data:data.result, status
        }
    },
    searchVacancy: async (position_id:number) => {
      const {data, status} = await axios.get(`http://v584337.hosted-by-vdsina.ru/api/get/vacancies/search/${position_id}`);
      return {
          data:data.result, status
      }
    },
    addCompany: async (req:ResponceCompany) => {
        const { data, status } = await axios.post(
            'http://v584337.hosted-by-vdsina.ru/api/add/company',
            JSON.stringify(req),
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          return {
            addData:data,
            status,
          };
    },
    getBranches: async () => {
      const {data, status} = await axios.get(`http://v584337.hosted-by-vdsina.ru/api/get/branches`);
      return {
          data:data.result, status
      }
    },
    addBranches: async (req:ResponceBranches) => {
      const { data, status } = await axios.post(
          'http://v584337.hosted-by-vdsina.ru/api/add/branch',
          JSON.stringify(req),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return {
          addData:data,
          status,
        };
    },
    imgUpload: async(req:any)=> {
        var config:AxiosRequestConfig = {
            method: 'post',
            url: 'https://api.imgbb.com/1/upload?key=05272ad2c5fde1d28e828e5737a35a0e',
            data : req
          };
          
        const {data, status} = await axios(config);

        return {
            data:data, status
        }
    },  
}

export default API