import React, {Component} from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ViewPropTypes,
} from 'react-native'
import { connect } from 'react-redux'
import { Header } from 'react-native-elements'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'


// 画面の高さを取得
const { height,width } = Dimensions.get("window");

const Title = () => {
  return (
    <View>
      <Text style={{fontSize: 20, color: 'white'}}>電卓</Text>
    </View>
    );
};

class Top extends Component {
  render() {
    const props = this.props
    const topData = props.topData
    return (
      <View style={{ flex: 1}}>
        <Header
          placement="left"
          centerComponent={<Title />}
        />
        <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff', flex: 1}}>
          <Row data={topData.result} style={styles.head} textStyle={styles.headText}/>
          <Row data={topData.tableData[0]} style={styles.row} textStyle={styles.cellText} {...props}/>
          <Row data={topData.tableData[1]} style={styles.row} textStyle={styles.cellText} {...props}/>
          <Row data={topData.tableData[2]} style={styles.row} textStyle={styles.cellText} {...props}/>
          <Row data={topData.tableData[3]} style={styles.row} textStyle={styles.cellText} {...props}/>
          <Row data={topData.tableData[4]} style={styles.row} textStyle={styles.cellText} {...props}/>
        </Table>
      </View>
    );
  }
}
// テーブルの定義
class Table extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    borderStyle: ViewPropTypes.style
  };

  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(
        child,
        props.borderStyle && child.type.displayName !== 'ScrollView' ? { borderStyle: props.borderStyle } : {}
      )
    );
  }

  render() {
    const { borderStyle } = this.props;
    const borderLeftWidth = (borderStyle && borderStyle.borderWidth) || 0;
    const borderBottomWidth = borderLeftWidth;
    const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

    return (
      <View
        style={[
          this.props.style,
          {
            borderLeftWidth,
            borderBottomWidth,
            borderColor
          }
        ]}
      >
        {this._renderChildren(this.props)}
      </View>
    );
  }
}

// テーブルラッパークラス
class TableWrapper extends Component {
  static propTypes = {
    style: ViewPropTypes.style
  };
  _renderChildren(props) {
    return React.Children.map(props.children, child =>
      React.cloneElement(child, props.borderStyle ? { borderStyle: props.borderStyle } : {})
    );
  }
  render() {
    const { style } = this.props;
    return <View style={style}>{this._renderChildren(this.props)}</View>;
  }
}

// 列の定義
class Row extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const sum = arr => arr.reduce((acc, n) => acc + n, 0);
    const { data, style, widthArr, height, flexArr, textStyle, ...props } = this.props;
    let width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[height && { height }, width && { width }, styles.row, style]}>
        {data.map((item, i) => {
          const flex = flexArr && flexArr[i];
          const wth = widthArr && widthArr[i];
          return <Cell key={i} data={item} width={wth} height={height} flex={flex} textStyle={textStyle} {...props} />;
        })}
      </View>
    ) : null;
  }
}

class Rows extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style
  };

  render() {
    const { data, style, widthArr, heightArr, flexArr, textStyle, ...props } = this.props;
    const flex = flexArr ? sum(flexArr) : 0;
    const width = widthArr ? sum(widthArr) : 0;

    return data ? (
      <View style={[flex && { flex }, width && { width }]}>
        {data.map((item, i) => {
          const height = heightArr && heightArr[i];
          return (
            <Row
              key={i}
              data={item}
              widthArr={widthArr}
              height={height}
              flexArr={flexArr}
              style={style}
              textStyle={textStyle}
              {...props}
            />
          );
        })}
      </View>
    ) : null;
  }
}

// セルの定義
class Cell extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    borderStyle: ViewPropTypes.style
  };

  render() {
    const { data, width, height, flex, style, textStyle, borderStyle, pushButton, ...props } = this.props;
    const borderTopWidth = (borderStyle && borderStyle.borderWidth) || 0;
    const borderRightWidth = borderTopWidth;
    const borderColor = (borderStyle && borderStyle.borderColor) || '#000';

    return (
      <TouchableOpacity
        style={[
          {
            borderTopWidth,
            borderRightWidth,
            borderColor
          },

          styles.cell,
          width && { width },
          height && { height },
          flex && { flex },
          !width && !flex && !height && !style && { flex: 1 },
          style
        ]}
        onPress={() => pushButton(data)}
      >
        <Text style={[textStyle, styles.text]} {...props}>
          {data}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: { height: height*0.16, backgroundColor: '#f1f8ff'},
  headText: { margin: 10, alignSelf: 'flex-end', fontSize: moderateScale(38)},
  cell: { justifyContent: 'center', height: height*0.12 },
  cellText: { margin: 6, alignSelf: 'center', fontSize: moderateScale(20)},
  row: {flexDirection: 'row', overflow: 'hidden'}
});


const mapStateToProps = state => ({})

const mapDispatchToProps = {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Top)