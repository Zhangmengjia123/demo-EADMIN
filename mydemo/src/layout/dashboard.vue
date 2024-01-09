<template>
  <div>
    <div class="tubiao">
      <span class="icon-icon_github iconfont lll"></span>
    </div>
    <div class="top">
      <ul>
        <li>
          <div class="left">
						<svg-icon icon-class="haoyou" class="tu1"></svg-icon>
          </div>
          <div class="right">
            <span>New Visits</span>
            <h3>102，400</h3>
          </div>
        </li>
        <li>
          <div class="left">
						<svg-icon icon-class="xiaoxi" class="tu2"></svg-icon>
          </div>
          <div class="right">
            <span>Messages</span>
            <h3>81,212</h3>
          </div>
        </li>
        <li>
          <div class="left">
						<svg-icon icon-class="qianqian-" class="tu3"></svg-icon>
          </div>
          <div class="right">
            <span>New Visits</span>
            <h3>102，400</h3>
          </div>
        </li>
        <li>
          <div class="left">
            <svg-icon icon-class="gouwuchefill" class="tu4"></svg-icon>
          </div>
          <div class="right">
            <span>Shoppings</span>
            <h3>13,600</h3>
          </div>
        </li>
      </ul>
    </div>
    <div class="middle">
      <zhexian></zhexian>
    </div>

    <div class="bottom">
      <div class="box">
        <leida></leida>
      </div>
      <div class="box">
        <bingtu></bingtu>
      </div>
      <div class="box">
        <zhuzhuang></zhuzhuang>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, ChatDotSquare } from '@element-plus/icons-vue'
import zhexian from '../components/dash/zhexian.vue'
import leida from '../components/dash/leida.vue'
import bingtu from '../components/dash/bingtu.vue'
import zhuzhuang from '../components/dash/zhuzhuang.vue'
</script>

<style lang="scss" scoped>
.tubiao {
  border-style: solid;
  border-width: 0px 0px 70px 70px;
  border-color: transparent transparent #40c9c6 transparent;
  width: 0px;
  height: 0px;
  transform: rotate(-91deg);
  position: absolute;
  right: 0;
  top: 50px;
  // background: ;
  .lll {
    position: absolute;
    font-size: 40px;
    top: 24px;
    right: 4px;
    color: #fff;
    // background-color: ;
    transform: rotate(138deg);
  }
}

.bottom {
  width: 100%;
  height: 300px;
  // border: 1px solid #000;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  .box {

    width: 32%;
    // border: 1px solid #000;
    background-color: #fff;
  }
}

.top {
  width: 100%;
  margin-top: 50px;

  ul {
    display: flex;
    justify-content: space-between;

    li:hover .tu1 {
      background-color: #40c9c6;
      border-radius: 5px;
      color: #fff !important;
    }

    li:hover .tu2 {
      border-radius: 5px;
      background-color: #36a3f7;
      color: #fff !important;
    }

    li:hover .tu3 {
      border-radius: 5px;
      background-color: #f4516c;
      color: #fff !important;
    }

    li:hover .tu4 {
      border-radius: 5px;
      background-color: #34bfa3;
      color: #fff !important;
    }

    li {
      display: flex;
      justify-content: space-between;
      width: 23%;
      background-color: #fff;
      height: 100px;
      cursor: pointer;
      box-shadow: 0 0 5px gray;

      .left {
        // padding-left: 20px;
        width: 100px;
        line-height: 100px;
        text-align: center;

        .tu1,.tu4 {
          padding: 10px 10px;
          margin-top: 10px;
          font-size: 60px;
          color: #40c9c6;
        }

        .tu2 {
          padding: 10px 10px;
          margin-top: 10px;
          font-size: 60px;
          color: #36a3f7;
        }

        .tu3 {
          padding: 10px 10px;
          margin-top: 10px;
          font-size: 60px;
          color: #f4516c;
        }


      }

      .right {
        padding-right: 20px;
        margin-top: 20px;

        span {
          color: #8c8c8c;
        }

        h3 {
          margin-top: 5px;
          color: #666666;
        }
      }
    }
  }
}

.middle {
  background-color: #fff;
  width: 100%;
  height: 350px;
  margin-top: 30px;
}
</style>
