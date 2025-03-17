<template>
  <div class="steps-wrapper">
    <el-steps :active="activeIndex" align-center finish-status="success" process-status="finish">
      <el-step v-for="item in stepList" :key="item" :title="item">
        <slot></slot>
      </el-step>
    </el-steps>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Steps',
});

type Props = {
  modelValue: number;
  stepList: string[];
};

const props = withDefaults(defineProps<Props>(), {});

const emit = defineEmits<{
  (e: 'update:modelValue', val: number): void;
}>();

const activeIndex = computed({
  get() {
    return props.modelValue;
  },
  set(val) {
    emit('update:modelValue', val);
  },
});
</script>

<style lang="scss" scoped>
@use '@/style/common.scss' as *;

.steps-wrapper {
  margin-top: 40px;
  padding-right: 80px;
}

:deep() {
  .el-step {
    --el-color-success: #{getCssVar('color', 'primary')};

    .el-step__head {
      .el-step__icon {
        &.is-text {
          border: none;
        }

        .el-step__icon-inner {
          font-weight: 500;
        }
      }

      &.is-finish {
        .el-step__icon {
          &.is-text {
            background: getCssVar('color', 'primary');

            .el-step__icon-inner {
              color: #ffffff;
            }
          }
        }
      }

      &.is-success {
        .el-step__icon {
          &.is-text {
            background: #e8efff;
          }
        }

        .el-step__line {
          border-bottom-color: getCssVar('color', 'primary');
        }
      }

      &.is-wait {
        .el-step__icon {
          &.is-text {
            background: #f0f0f0;

            .el-step__icon-inner {
              color: getCssVar('text-color', 'primary');
            }
          }
        }
      }
    }

    .el-step__line {
      right: calc(-50% + 22px);
      height: 0;
      border-bottom: 2px dashed getCssVar('text-color', 'placeholder');
      background-color: transparent;

      .el-step__line-inner {
        display: none;
      }
    }

    .el-step__main {
      position: absolute;
      top: 50%;
      left: 50%;
      padding-right: 10px;
      padding-left: 22px;
      background-color: #ffffff;
      transform: translateY(-50%);
      vertical-align: middle;

      .el-step__title {
        line-height: 25px;
        vertical-align: middle;
        width: max-content;

        &.is-finish {
          font-weight: bold;
        }

        &.is-success {
          color: getCssVar('text-color', 'primary');
        }
      }

      .el-step__description {
        display: none;
      }
    }
  }
}
</style>
