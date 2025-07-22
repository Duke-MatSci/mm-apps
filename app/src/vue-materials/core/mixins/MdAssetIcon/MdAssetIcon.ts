export default {
  methods: {
    isAssetIcon: (icon: string) => /\w+[/\\.]\w+/.test(icon),
  },
};
