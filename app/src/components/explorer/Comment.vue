<template>
  <div>
    <div class="wrapper u_margin-top-med md-layout">
      <div class="u_width--max">
        <h4 class="md-title">Comments</h4>
      </div>

      <div
        v-for="(item, i) in optionalChaining(() => loadComment.comments)"
        :key="i"
        :class="[
          isUserMessage(optionalChaining(() => item.user.displayName))
            ? 'md-alignment-bottom-right u--margin-left-auto'
            : 'md-alignment-top-left',
          'md-layout-item md-size-85 md-layout u_margin-top-med',
        ]"
      >
        <div
          v-if="!isUserMessage(optionalChaining(() => item.user.displayName))"
          class="u--margin-right-1"
        >
          <md-icon>account_circle</md-icon>
        </div>

        <div
          style="padding: 1.6rem; border: 1px solid #a2a5a9"
          :class="[
            isUserMessage(optionalChaining(() => item.user.displayName)) && 'u--margin-right-1',
            'md-layout-item u--b-rad',
          ]"
        >
          <p class="u--color-primary u--default-size">
            {{ item.user.givenName }} {{ item.user.surName }}
          </p>
          <p class="md-body-1">{{ item.comment }}</p>
          <p class="utility-align--right md-caption">{{ formatDate(item.createdAt) }}</p>
        </div>

        <div v-if="isUserMessage(optionalChaining(() => item.user.displayName))">
          <md-icon>account_circle</md-icon>
        </div>
      </div>
    </div>

    <div class="wrapper u_margin-top-med">
      <form>
        <md-field>
          <label>Message</label>
          <md-textarea v-model="commentInput"></md-textarea>
        </md-field>

        <button
          type="submit"
          @click.prevent="submitComment"
          class="btn btn--primary btn--noradius search_box_form_btn u--margin-bottommd u--margin-left-auto"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { useQuery, useMutation } from '@vue/apollo-composable';
import { LOAD_COMMENTS, POST_COMMENT } from '@/modules/gql/comment-gql';
import { useOptionalChaining } from '@/composables/useOptionalChaining';

// Props
interface Props {
  type: string;
  identifier: string;
}

const props = defineProps<Props>();

// Store
const store = useStore();

// Optional chaining utility
const { optionalChaining } = useOptionalChaining();

// Reactive data
const commentInput = ref('');
const comments = ref([]);
const pageNumber = ref(1);
const pageSize = ref(20);
const error = ref('');

// Computed
const displayName = computed(() => store.getters['auth/displayName']);
const isAuth = computed(() => store.getters['auth/isAuthenticated']);

// Apollo queries
const { result: loadComment, refetch: refetchComments } = useQuery(
  LOAD_COMMENTS,
  computed(() => ({
    input: {
      pageNumber: pageNumber.value,
      pageSize: pageSize.value,
      type: props.type,
      identifier: props.identifier,
    },
  })),
  {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'ignore',
  }
);

// Apollo mutations
const { mutate: postComment } = useMutation(POST_COMMENT);

// Methods
const isUserMessage = (arg: string): boolean => {
  return arg === displayName.value;
};

const errorHandler = (error: any) => {
  if (error.networkError) {
    const err = error.networkError;
    error.value = `Network Error: ${err?.response?.status} ${err?.response?.statusText}`;
  } else if (error.graphQLErrors) {
    error.value = error.graphQLErrors;
  }
  store.commit('setSnackbar', {
    message: error.value,
    duration: 10000,
  });
};

const isToday = (date: Date): boolean => {
  return new Date().toDateString() === date.toDateString();
};

const isYesterday = (date: Date): boolean => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toDateString() === date.toDateString();
};

const formatDate = (date: string): string => {
  const givenDate = new Date(parseInt(date));
  if (isToday(givenDate)) {
    return `Today ${givenDate.toLocaleTimeString()}`;
  }
  if (isYesterday(givenDate)) {
    return `Yesterday ${givenDate.toLocaleTimeString()}`;
  }
  return `${givenDate.toLocaleDateString()} ${givenDate.toLocaleTimeString()}`;
};

const submitComment = async () => {
  if (commentInput.value.length > 0) {
    if (isAuth.value && props.identifier && props.type) {
      try {
        await postComment({
          input: {
            comment: commentInput.value,
            type: props.type,
            identifier: props.identifier,
          },
        });
        commentInput.value = '';
        await refetchComments();
      } catch (error) {
        return errorHandler(error);
      }
    } else {
      errorHandler({ graphQLErrors: 'You must be logged in to post comments' });
    }
  }
};

// Watchers
watch(
  () => props.identifier,
  () => {
    refetchComments();
  }
);

// Component name for debugging
defineOptions({
  name: 'Comments',
});
</script>
