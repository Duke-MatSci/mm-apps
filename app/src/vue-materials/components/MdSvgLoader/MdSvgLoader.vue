<template>
  <i class="md-svg-loader" v-html="html"></i>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, nextTick } from 'vue';

let mdSVGStore: Record<string, Promise<string>> = {};

export default defineComponent({
  name: 'MdSVGLoader',
  props: {
    mdSrc: {
      type: String,
      required: true,
    },
  },
  emits: ['md-loaded'],
  setup(props, { emit }) {
    const html = ref<string | null>(null);
    const error = ref<string | null>(null);

    const isSVG = (mimetype: string) => {
      if (typeof mimetype !== 'string') return false;
      return mimetype.indexOf('svg') >= 0;
    };

    const setHtml = () => {
      mdSVGStore[props.mdSrc]
        .then((htmlContent) => {
          html.value = htmlContent;
          return nextTick();
        })
        .then(() => emit('md-loaded'));
    };

    const unexpectedError = (reject: (reason?: any) => void) => {
      error.value = `Something bad happened trying to fetch ${props.mdSrc}.`;
      reject(error.value);
    };

    const loadSVG = () => {
      if (!(props.mdSrc in mdSVGStore)) {
        mdSVGStore[props.mdSrc] = new Promise((resolve, reject) => {
          const request = new window.XMLHttpRequest();

          request.open('GET', props.mdSrc, true);

          request.onload = () => {
            const mimetype = request.getResponseHeader('content-type');

            if (request.status === 200) {
              if (isSVG(mimetype || '')) {
                resolve(request.response);
                setHtml();
              } else {
                error.value = `The file ${props.mdSrc} is not a valid SVG.`;
                reject(error.value);
              }
            } else if (request.status >= 400 && request.status < 500) {
              error.value = `The file ${props.mdSrc} do not exists.`;
              reject(error.value);
            } else {
              unexpectedError(reject);
            }
          };

          request.onerror = () => unexpectedError(reject);
          request.onabort = () => unexpectedError(reject);
          request.send();
        });
      } else {
        setHtml();
      }
    };

    watch(
      () => props.mdSrc,
      () => {
        html.value = null;
        loadSVG();
      }
    );

    onMounted(() => {
      loadSVG();
    });

    return {
      html,
      error,
    };
  },
});
</script>

<style lang="scss">
.md-svg-loader {
  display: block;

  svg {
    width: 100%;
  }
}
</style>
