const currentLevelName = 'currentLevel';
export const setCurrentLevelLocal = (level: any) => {
  localStorage.setItem(currentLevelName, JSON.stringify(level));
};
export const getCurrentLevelLocal = () => {
  const level = localStorage.getItem(currentLevelName);
  return level ? JSON.parse(level) : null;
};
