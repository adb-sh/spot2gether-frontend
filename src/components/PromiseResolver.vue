<template>
  <div
    class="position-relative PromiseResolver"
    :class="{ loading: loading && showThrobber }"
  >
    <slot
      v-if="!error && (!loading || (overlay && data !== null))"
      :data="getter(data)"
      :update="update"
    />
    <slot v-if="error" name="error">
      <div class="alert alert-danger">
        {{ error.message || 'Oops! Something went wrong :/' }}
      </div>
    </slot>
    <slot v-else-if="loading && showThrobber" name="loading">
      <div class="overlay">
        <div class="wrapper">
          <ThrobberLoading />
        </div>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watch } from "vue";
import ThrobberLoading from "@/components/ThrobberLoading.vue";

const props = defineProps({
  promise: [Promise, Object],
  getter: {
    type: Function,
    default: (data: unknown) => data,
  },
  overlay: {
    type: Boolean,
    default: true,
  },
  throbber: {
    type: Boolean,
    default: true,
  }
});

const loading = ref(true);
const showThrobber = ref(true);
const error = ref(null);
const data = ref(null);

const update = async (promise: Promise | unknown) => {
  loading.value = true;
  if (props.throbber) setTimeout(() => {
    if (loading.value) showThrobber.value = true;
  }, 500);
  try {
    data.value = await (promise.isPromiseList
      ? Promise.all(promise.promises)
      : promise);
  } catch (e) {
    error.value = e;
  } finally {
    loading.value = false;
    showThrobber.value = false;
  }
};
update(props.promise);

watch(() => props.promise, (to) => {
  update(to);
});
</script>

<style scoped lang="scss">
.PromiseResolver {
  &.loading {
    min-height: 5rem;
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    min-height: 5rem;
    background-color: #fffd;
    z-index: 9000;
    .wrapper {
      position: sticky;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 0;
      height: 100%;
      max-height: 100vh;
    }
  }
}
</style>
