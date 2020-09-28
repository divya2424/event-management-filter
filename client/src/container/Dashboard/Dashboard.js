import { connect } from "react-redux";
import DashboardComponent from "../../components/Dashboard/Dashboard.jsx";
import {fetchEvent,addEvent,filterDiscount} from '../../redux/eventReducer/actions'

const mapStateToProps = (state) => {
    return ({
        event : state.event
    })
}
const mapDispatchToProps = (dispatch) => {
    // console.log('dospactf',dispatch())
    return ({
        fetchEvent :() => dispatch(fetchEvent()) ,
        filterDiscount: (data) => dispatch(filterDiscount(data)),
        addEvent : (data) => dispatch(addEvent(data))
    })
}


const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);

export default Dashboard;
