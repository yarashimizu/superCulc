import React from "react"
import { connect } from 'react-redux'
import Top from './Top'
import {setResult} from './redux'


const mapStateToProps = (state, ownProps)  => ({ ...state })

const mapDispatchToProps = (dispatch, ownProps) => ({
  // importしたactionCreatorを記述。
  // 数字を押される
  pushButton: (data, befor, beforOperator) => {
    //いろんな計算処理
    switch (data) {
      case "=":   // 結果を出力
        
      case "+":   // 足す

      case "-":   // 引く

      case "×":   // 掛け算

      case "÷":   // 割り算

      case ".":   // 少数点入力

      case "C":   // 入力結果削除
        result = 0
        break
      case "+/-": // プラスマイナスをひっくり返す
        if ((""+befor).match(/-/)) {
          result = (""+befor).replace("-", "")
        } else {
          result = "-"+befor
        }
        break
      case "%":   // 100で割る
        result = parseFloat(befor) / 100
        break
      default:    // 数字
        result = befor + data
        break
    }
    dispatch(setResult(result));
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top)