import ApiService from './service';

const BridgeService = {
  findBridge() {
    ApiService.findIP();
    return ApiService.get().then((resp) => resp.data);
  },
  getBridgeId() {
    return ApiService.post('', { devicetype: 'my_hue_app#vue' }).then((resp) => resp.data);
  },
};
export default BridgeService;
