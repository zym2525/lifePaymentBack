<template>
  <iframe
    id="mapPage"
    width="500px"
    height="400px"
    frameborder="0"
    :src="`https://apis.map.qq.com/tools/locpicker?search=1&type=1&policy=1&mapdraggable=1&key=${VITE_WEMAP_KEY}&${
      modelValue.latitude ? 'coord=' + modelValue.latitude + ',' + modelValue.longitude : ''
    }&referer=myJobAddress`"
  >
  </iframe>
</template>

<script setup lang="ts">
import { useAllAreaList } from '@/hooks';
import { Message } from '@bole-core/core';
import { loadEnv } from '@build/index';
import { useFormItem } from 'element-plus';

defineOptions({
  name: 'WeMap',
});

const { VITE_WEMAP_KEY } = loadEnv();

type Props = {
  modelValue: WeMapModel;
  validateEvent?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  modelValue: () => ({} as WeMapModel),
  validateEvent: true,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: WeMapModel): void;
}>();

const { findAreaCodeFromName } = useAllAreaList();

onMounted(() => {
  window.addEventListener('message', locationPicker, false);
  // 检查地理位置权限
  // navigator.permissions.query({ name: 'geolocation' }).then(function (result) {
  //   if (result.state === 'granted') {
  //     // 用户允许地理位置访问
  //     window.addEventListener('message', locationPicker, false);
  //   } else {
  //     // 用户尚未做出选择，可以请求授权
  //     Message.warnMessage('需要获取浏览器定位权限');
  //     return;
  //   }
  // });
});

const { formItem } = useFormItem();

function locationPicker(event) {
  var loc = event.data;
  if (loc && loc.module === 'locationPicker') {
    let provinceName = '';
    let cityName = '';
    let countyName = '';
    let nameList = loc.poiaddress.match(
      /.+?(省|行政区|市|自治区|自治州|行政单位|盟|市辖区|旗|海域|岛|县|区)/g
    );
    if (nameList) {
      if (nameList?.length === 2) {
        provinceName = nameList[0];
        cityName = nameList[0];
        countyName = nameList[1];
      } else {
        provinceName = nameList[0];
        cityName = nameList[1];
        countyName = nameList[2];
      }
    }
    //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
    emit('update:modelValue', {
      latitude: loc.latlng.lat,
      longitude: loc.latlng.lng,
      provinceName,
      cityName,
      countyName,
      provinceCode: findAreaCodeFromName(provinceName),
      cityCode: findAreaCodeFromName(cityName),
      countyCode: findAreaCodeFromName(countyName),
      address: loc.poiaddress,
    });
    if (props.validateEvent) {
      formItem?.validate?.('change');
    }
  }
}

onUnmounted(() => {
  window.removeEventListener('message', locationPicker);
});
</script>
