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
import dayjs from "dayjs";

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
      xAxis: {
        splitLine: {
          show: false
        },
        axisLabel: {
          rotate: 45
        }
      }
    };
    return {
      city: "武汉",
      cities: [],
      cityData: {
        columns: [
          "updateTime",
          "hubeiConfirmedCount",
          "confirmedCount",
          "exceptConfirmedCount"
        ],
        rows: []
      },
      cityIncreaseData: {
        columns: [
          "updateTime",
          "hubeiIncreaseCount",
          "increaseCount",
          "exceptIncreaseCount"
        ],
        rows: []
      }
    };
  },

  computed: {
    chartSettings() {
      return {
        labelMap: {
          confirmedCount: this.city + "确诊",
          hubeiConfirmedCount: "湖北确诊",
          exceptConfirmedCount: `非${this.city}确诊`,
          hubeiIncreaseCount: "湖北增量",
          increaseCount: this.city + "增量",
          exceptIncreaseCount: `非${this.city}增量`
        }
      };
    }
  },

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
      let cityRows = [];
      let cityIncreaseData = [];
      let lastRow = {};
      let lastCityRow = {};
      let data = this._areaData.results.concat([]);
      data.reverse().forEach((row, index) => {
        row.updateTime = dayjs(row.updateTime).format("MM/DD");
        if (
          row.updateTime !== lastRow.updateTime &&
          row.confirmedCount !== lastRow.confirmedCount
        ) {
          let cityRow = row.cities.filter(i => i.cityName === this.city);
          if (cityRow.length) {
            cityRow = cityRow[0];

            cityRows.push({
              ...cityRow,
              updateTime: row.updateTime,
              hubeiConfirmedCount: row.confirmedCount,
              exceptConfirmedCount: row.confirmedCount - cityRow.confirmedCount
            });

            if (index !== 0) {
              let hubeiIncreaseCount =
                lastRow.confirmedCount - row.confirmedCount;
              let increaseCount =
                lastCityRow.confirmedCount - cityRow.confirmedCount;
              cityIncreaseData.push({
                updateTime: lastRow.updateTime,
                hubeiIncreaseCount,
                increaseCount,
                exceptIncreaseCount: hubeiIncreaseCount - increaseCount
              });
            }
            lastRow = row;
            lastCityRow = cityRow;
          }
        }
      });
      this.cityData.rows = cityRows.reverse();
      this.cityIncreaseData.rows = cityIncreaseData.reverse();
    }
  }
};
</script>
<style lang="scss" scoped>
.mgt-30 {
  margin-top: 30px;
}
</style>
