import React from "react"
import { connect } from 'react-redux'
import Top from './Top'
import {setResult} from './redux'


const mapStateToProps = (state, ownProps)  => ({ ...state })

const mapDispatchToProps = (dispatch, ownProps) => ({
  // importしたactionCreatorを記述。
  // 数字を押される
  pushButton: data => {
    console.log(ownProps);
    //いろんな計算処理
    // イコールが選択された場合
    dispatch(setResult(data));
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top)