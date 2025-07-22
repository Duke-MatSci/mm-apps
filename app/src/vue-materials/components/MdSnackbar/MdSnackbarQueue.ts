let currentSnackbar: any = null;
let timeout: any = null;

function createPromise(duration: number, persistent: boolean, context: any) {
  return new Promise((resolve) => {
    currentSnackbar = {
      destroy: () => {
        currentSnackbar = null;
        resolve(undefined);
      },
    };

    if (duration !== Infinity) {
      timeout = window.setTimeout(() => {
        destroySnackbar();
        if (!persistent) {
          context._vnode.componentInstance.initDestroy(true);
        }
      }, duration);
    }
  });
}

export const destroySnackbar = () => {
  return new Promise((resolve) => {
    if (currentSnackbar) {
      window.clearTimeout(timeout);
      currentSnackbar.destroy();
      window.setTimeout(resolve, 400);
    } else {
      resolve(undefined);
    }
  });
};

export const createSnackbar = (duration: number, persistent: boolean, context: any) => {
  if (currentSnackbar) {
    return destroySnackbar().then(() => {
      return createPromise(duration, persistent, context);
    });
  }

  return createPromise(duration, persistent, context);
};
