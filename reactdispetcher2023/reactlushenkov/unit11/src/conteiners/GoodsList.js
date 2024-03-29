import {connect} from 'react-redux'
import List from "../components/List"

function mapStateToProps(state) {
  const {goods} = state
  return {goods: goods}
}

export default connect( // connect ф-я покорая позволяет подписываться на события хранилища и передавать даныне в другой компанент
  mapStateToProps,
  null
)(List)