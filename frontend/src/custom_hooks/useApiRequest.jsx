import { useCallback,useContext } from 'react';
import axios from 'axios';
import { fetching, success, error } from '../store/GlobalActions';
import GlobalContext from '../store/GlobalContext';

const useApiRequest = (endpoint, { method = 'get', params = {} } = {}) => {
    const {globalState,globalDispatch} = useContext(GlobalContext);
    const makeRequest = useCallback(async () => {
        globalDispatch(fetching());
        try {
            const response = await axios[method](endpoint, params);
            globalDispatch(success(response));
        } catch (e) {
            globalDispatch(error(e));
        }
    }, [endpoint, method, params]);

    return [globalState, makeRequest];
};
export default useApiRequest;
