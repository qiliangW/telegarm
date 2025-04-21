import { create } from 'zustand';
import { getUserEnergy } from '@/api/energy';
import { getEdenToken } from '@/api/user';
import {
  getCurrentLevelLocal,
  setCurrentLevelLocal,
} from '@/utils/sessionStorage';
let gender = localStorage.getItem('appGender') || 'female';
let isFirstUse =
  localStorage.getItem('isFirstUse') == null ||
  localStorage.getItem('isFirstUse') == 'true';

const useStore: any = create((set: any) => ({
  isFirstUse, //首次使用
  firstUseIndex: 1, //使用步骤
  gamePlaying: false, //游戏进行中
  startGame: false,
  userInfo: {},
  token: localStorage.getItem('userToken'),
  loginType: localStorage.getItem('loginType'),
  setLoginType: (loginType: string) => {
    console.log(loginType);
    set(() => ({ loginType }));
    localStorage.setItem('loginType', loginType);
  },
  setStartGame: (startGame: boolean) => set(() => ({ startGame })),
  currentLevel: getCurrentLevelLocal(),
  setIsFirstUse: (isFirstUse) => {
    localStorage.setItem('isFirstUse', isFirstUse);
    set({ isFirstUse });
  },
  setFirstUseIndex: (firstUseIndex) => set(() => ({ firstUseIndex })),
  setGamePlaying: (gamePlaying) => set(() => ({ gamePlaying })),

  setToken: (token: string) => {
    token && localStorage.setItem('userToken', token);
    !token && localStorage.removeItem('userToken');
    set(() => ({ token }));
  },
  setUserInfo: (userInfo: any) => set(() => ({ userInfo })),
  setCurrentLevel: (currentLevel: any) => {
    setCurrentLevelLocal(currentLevel);
    set(() => ({ currentLevel }));
  },
  edenToken: 0,
  setEdenToken: async () => {
    try {
      const res: any = await getEdenToken({});
      set({ edenToken: res.tokenBalance });
    } catch (e) {
      console.log(e);
    }
  },
  useEnergy: 0,
  setUseEnergy: async () => {
    try {
      const res: any = await getUserEnergy({});
      set({ useEnergy: res.pointBalance });
    } catch (e) {
      console.log(e);
    }
  },
  gender,
  setGender: (gender: any) => {
    localStorage.setItem('appGender', gender);
    set(() => ({ gender }));
  },
}));
export default useStore;
