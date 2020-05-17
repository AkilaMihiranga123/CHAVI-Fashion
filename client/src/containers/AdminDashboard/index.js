import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Slideshow from '../../components/SlideShow/Slide';


class AdminDashboard extends Component{

    render() {
        return (
            <React.Fragment>
                <Header/>
                <Slideshow />
            </React.Fragment>

        );
    }
}
export default AdminDashboard;