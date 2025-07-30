export function useMdAssetIcon() {
  const isAssetIcon = (icon: string): boolean => {
    return /\w+[/\\.]\w+/.test(icon);
  };

  return {
    isAssetIcon,
  };
}

export default useMdAssetIcon;
