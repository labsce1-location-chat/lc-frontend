import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
// This is just a test component that has redux state mapped to it


function Test(props){
    return(
        <View>
            {/* Just seeing if it can display the text in Redux */}
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