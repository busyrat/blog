<template>
  <div>
    <el-select v-model="city" placeholder="请选择" @change="convertData">
      <el-option
        v-for="item in cities"
        :key="item"
        :label="item"
        :value="item"
      ></el-option>
    </el-select>
    <div class="mgt-30">
      确诊总量
      <ve-line
        :data="cityData"
        :settings="chartSettings"
        :extend="extend"
      ></ve-line>
    </div>
    <div class="mgt-30">
      确诊增量
      <ve-line
        :data="cityIncreaseData"
        :settings="chartSettings"
        :extend="extend"
      ></ve-line>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import VeLine from "v-charts/lib/line.common";

export default {
  props: {},

  components: { VeLine },

  data() {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      },
      grid: {
        right: 20
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false
        }
      }
    };
    return {
      chartSettings: {
        labelMap: {
          confirmedCount: "确诊",
          hubeiConfirmedCount: "湖北确诊",
          hubeiIncreaseCount: "湖北增量",
          increaseCount: "增量"
        }
      },
      city: "武汉",
      cities: [],
      cityData: {
        columns: ["updateTime", "hubeiConfirmedCount", "confirmedCount"],
        rows: []
      },
      cityIncreaseData: {
        columns: ["updateTime", "hubeiIncreaseCount", "increaseCount"],
        rows: []
      }
    };
  },

  computed: {},

  mounted() {
    axios
      .get("https://lab.ahusmart.com/nCoV/api/area?latest=0&province=湖北省")
      .then(({ data }) => {
        this._areaData = data;
        this.cities = data.results[data.results.length - 1].cities.map(
          i => i.cityName
        );
        this.convertData();
      });
  },

  methods: {
    convertData() {
      this.chartSettings.labelMap.confirmedCount = this.city + "确诊";
      this.chartSettings.labelMap.increaseCount = this.city + "增量";
      let cityRows = [];
      let cityIncreaseData = [];
      let lastRow = { updateTime: 0, confirmedCount: 0 };
      let lastCityRow = { confirmedCount: 0 };
      this._areaData.results.forEach(row => {
        if (row.updateTime - lastRow.updateTime >= 24 * 60 * 60 * 1000) {
          let cityRow = row.cities.filter(i => i.cityName === this.city);
          if (cityRow.length) {
            cityRow = cityRow[0];
            cityRows.push({
              ...cityRow,
              updateTime: row.updateTime,
              hubeiConfirmedCount: row.confirmedCount
            });
            if (cityRow.confirmedCount === undefined) {
              cityRow.confirmedCount = 0;
            }
            cityIncreaseData.push({
              updateTime: row.updateTime,
              hubeiIncreaseCount: row.confirmedCount - lastRow.confirmedCount,
              increaseCount: cityRow.confirmedCount - lastCityRow.confirmedCount
            });
            lastRow = row;
            lastCityRow = cityRow;
          }
        }
      });
      this.cityData.rows = cityRows;
      this.cityIncreaseData.rows = cityIncreaseData;
    }
  }
};
</script>
<style lang="scss" scoped>
.mgt-30 {
  margin-top: 30px;
}
</style>
