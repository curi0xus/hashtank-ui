const useToolTips = (key: string) => {
  async function setSeen() {
    window.localStorage.setItem(key, 'true');
  }

  function getSeen() {
    const value = window.localStorage.getItem(key);
    return value === 'true' ? true : false;
  }
  return {
    isSeen: getSeen(),
    setSeen,
  };
};

export default useToolTips;
