import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';

function Test(props){
    return(
        <View>
            <Text>{props.test}</Text>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        test : state.test,
    };
};

export default connect(mapStateToProps)(Test);