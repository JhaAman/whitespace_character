//
// API Service Helpers
//
// Org: Team Whitespace Character
// Authors: Khai Nguyen, khainguyen@umass.edu
// Created: April 21, 2021
//
// File contains helper functions for backend interaction tasks
//

import axios from 'axios';


/**
 * Root for API endpoints
 * 
 * Exact value should be migrated to an environment file, but for now is
 * explicitly given in code
 */
const API_ENDPOINT_ROOT="http://localhost:8000/api/"

/**
 * Time to wait for API response until timeout
 * 
 * Exact value should be migrated to an environment file, but for now is
 * explicitly given in code
 */
const API_TIMEOUT=60000


/**
 * 
 * @param {Object} param0 
 * Object of the following type:
 * {
 *    "method": Default method is "get"
 *    "endpoint": Rel path (wrt to API_ENDPOINT) to API endpoint
 *    "data": Request body
 *    "param": Request parameter
 * }
 * 
 * @returns {Object} 
 * Response from API call
 */
const fetchAPI = async ({
	method   = "get",   // Default method is "get"
	endpoint = "",      // API relative path (wrt to API_ENDPOINT_ROOT)
	data     = {},      // Request body
    params   = {},      // Request parameter
    headers  = {},      // Request header 
}) => {

    try {

        // console.log(API_ENDPOINT_ROOT + endpoint)
        // console.log(data)
        // console.log(headers)

        const resp = await axios({
            method: method,
            url: API_ENDPOINT_ROOT + endpoint,
            timeout: API_TIMEOUT,
            data: data,
            params: params,
            headers: headers,
        });

        return resp;

    } catch(error) {
        // // Error
        // if (error.response) {
        //     /*
        //     * The request was made and the server responded with a
        //     * status code that falls out of the range of 2xx
        //     */
        //     console.log(error.response.data);
        //     console.log(error.response.status);
        //     console.log(error.response.headers);
        // } else if (error.request) {
        //     /*
        //     * The request was made but no response was received, `error.request`
        //     * is an instance of XMLHttpRequest in the browser and an instance
        //     * of http.ClientRequest in Node.js
        //     */
        //     console.log(error.request);
        // } else {
        //     // Something happened in setting up the request and triggered an Error
        //     console.log('Error', error.message);
        // }
        console.log(error);
    }
};

export default fetchAPI