<template>
  <div class="xmlLoader">
    <section class="u_width--max viz-u-postion__rel utility-roverflow" v-if="!yamlLoading">
      <md-drawer
        class="md-right"
        :class="{ ' md-fixed': showSidepanel }"
        v-model:md-active="showSidepanel"
      >
        <comment :type="type" :identifier="xmlId"></comment>
        <md-button
          @click="showSidepanel = false"
          class="md-fab md-fixed md-dense md-fab-top-right md-primary btn--primary"
        >
          <md-icon>close</md-icon>
        </md-button>
      </md-drawer>

      <div class="u_width--max viz-u-postion__rel utility-roverflow">
        <md-content
          class="u_width--max md-app-side-drawer md-app-container md-scrollbar u_margin-none"
        >
          <div :class="[isSmallTabView ? 'u_myprofile--container' : '']">
            <h2 class="visualize_header-h1 u_margin-top-med u_centralize_text">
              {{ `${optionalChaining(() => controlID)}.yaml` }}
            </h2>
            <div class="u_centralize_text viz-u-mgbottom-sm">
              <a
                @click.prevent="openYaml(true)"
                class="viz-tab__button"
                :class="[!loadYaml && 'active u--color-primary']"
                >XML View</a
              >
              ||
              <a class="viz-tab__button" :class="[loadYaml && 'active u--color-primary']" href="#"
                >YAML View</a
              >
            </div>
          </div>
          <!-- xml viewer  -->
          <div class="wrapper" style="min-width: 90%" ref="codeBlock">
            <!-- <XmlView ref="codeBlock" :content="dataFeed" :isYaml="loadYaml" /> -->
            <pre>
              <code class="language-yml keepMarkUp">{{ optionalChaining(() => yamlString) }}</code>
            </pre>
          </div>
        </md-content>

        <md-content class="u_margin-bottom-small">
          <md-button
            class="md-primary md-raised btn--primary"
            :class="[
              isLargeTabView
                ? 'viz-u-display__show u--margin-centered'
                : 'viz-u-postion__abs utility-absolute-input visualize--link-bottom',
            ]"
            @click="
              requestApproval({
                curationId: xmlViewer.id,
                isNew: xmlViewer.isNewCuration,
              })
            "
            v-if="
              isAuth &&
              !isAdmin &&
              xmlViewer.status === 'Not Approved' &&
              xmlViewer.curationState === 'Editing'
            "
          >
            Request Approval
          </md-button>
        </md-content>
      </div>
      <div
        :class="[
          isSmallTabView ? 'u_margin-top-small u_adjust-banner-text' : 'u--margin-neg',
          'md-fab md-fab-top-right u_width--max u--shadow-none u--layout-flex u--layout-flex-justify-end u--b-rad',
        ]"
      >
        <md-button class="md-fab md-dense md-primary btn--primary" @click.prevent="navBack">
          <md-tooltip>Go Back</md-tooltip>
          <md-icon>arrow_back</md-icon>
        </md-button>

        <md-button @click="showSidepanel = true" class="md-fab md-dense md-primary btn--primary">
          <md-tooltip md-direction="top">Comment</md-tooltip>
          <md-icon>comment</md-icon>
        </md-button>
      </div>
    </section>

    <section class="section_loader u--margin-toplg" v-else>
      <spinner :loading="yamlLoading" text="Loading Yaml" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import Prism from 'prismjs';
import 'prismjs/themes/prism-coy.min.css';
import 'prismjs/themes/prism-dark.css';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-yaml';
import { useOptionalChaining } from '@/composables/useOptionalChaining';
import Comment from '@/components/explorer/Comment.vue';
import Spinner from '@/components/Spinner.vue';

// Component name for debugging
defineOptions({
  name: 'YamlVisualizer',
});

// Composables
const store = useStore();
const route = useRoute();
const router = useRouter();
const { optionalChaining } = useOptionalChaining();

// Template refs
const codeBlock = ref<HTMLElement>();

// Reactive data
const showSidepanel = ref(false);
const type = ref('xml');
const yamlString = ref('');
const yamlLoading = ref(false);
const xmlViewer = ref({} as any);

// Computed properties
const isAuth = computed(() => store.getters['auth/isAuthenticated']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const userId = computed(() => store.getters['auth/userId']);

const isSmallTabView = computed(() => screen.width < 760);
const isLargeTabView = computed(() => screen.width < 1024);
const loadYaml = computed(() => !!route.query.isYaml);
const xmlId = computed(() => route.params.id);
const controlID = computed(() => route.query?.title?.split('.')[0]);

// Watch for YAML string changes to highlight syntax
watch(
  () => yamlString.value,
  async () => {
    if (yamlString.value) {
      await nextTick();
      if (codeBlock.value) {
        Prism.highlightElement(codeBlock.value);
      }
    }
  }
);

// Methods
const navBack = () => {
  router.back();
};

const openAsYaml = async () => {
  yamlLoading.value = true;
  if (!controlID.value) {
    yamlLoading.value = false;
    return router.push({ name: 'XmlGallery' });
  }
  try {
    const res = await fetch(`/api/mn/yaml-loader/${controlID.value}`);
    if (!res.ok) {
      throw new Error('Failed to convert to YAML');
    }
    const yamlText = await res.text();
    yamlString.value = yamlText;
    yamlLoading.value = false;
  } catch (error: any) {
    yamlLoading.value = false;
    store.commit('setSnackbar', {
      message: error.message ?? 'An error occurred while trying to convert to YAML',
      action: () => openAsYaml(),
    });
  }
};

const openYaml = () => {
  const query = {
    isNewCuration: route.query?.isNewCuration,
  };
  const params = {
    id: route.params.id,
  };

  return router.push({ name: 'XmlVisualizer', params, query });
};

// Store actions
const requestApproval = async (payload: any) => {
  await store.dispatch('explorer/curation/requestApproval', payload);
};

// Lifecycle
onMounted(async () => {
  await openAsYaml();
  window.Prism = window.Prism || {};
  window.Prism.manual = true;
});
</script>
