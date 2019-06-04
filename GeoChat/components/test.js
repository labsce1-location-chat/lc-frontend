import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

function Test(props){
    return(
        <View>
            <Text>{props.test}</Text>
            <Text>{props.test2}</Text>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        test : state.test,
        test2 : state.test2
    };
};

export default connect(mapStateToProps)(Test);