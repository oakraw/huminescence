import ApiService from './service';

const ControlService = {
  getDevices(bridgeId) {
    return ApiService.get(`${bridgeId}/lights`).then((resp) => resp.data);
  },
  commandLight(bridgeId, lightId, payload) {
    return ApiService.put(`${bridgeId}/lights/${lightId}/state`, payload).then((resp) => resp.data);
  },
};
export default ControlService;
