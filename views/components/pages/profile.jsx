import React from 'react';
import cookie from 'react-cookie';
import Jumbotron from "../layouts/jumbotron.jsx";
import Content from "../layouts/content.jsx";
import ContentTitle from "../layouts/content-title.jsx";
import UserFormEdit from "../elements/forms/user-form-edit.jsx";
import Fetcher from "../utilities/fetcher.jsx";

class Profile extends React.Component {

    constructor(props){
        super(props);
        let uid = cookie.load("uid");
        this.state = {myUser:false, url:`/api/v1/users/${uid}`}

        this.fetchUser = this.fetchUser.bind(this);
    }

    componentDidMount(){
        this.fetchUser();
    }

    fetchUser(){
        let self = this;
        Fetcher(self.state.url).then(function (response) {
            if(!response.error){
                console.log("my user", response);
                self.setState({loading: false, myUser: response});
            }else{
                console.log("error getting user", response);
                self.setState({loading: false});
            }
        })
    }

    render () {
        let pageName = this.props.route.name;
        let breadcrumbs = [{name: 'Home', link: 'home'}, {name: 'My Services', link: '/my-services'}, {name: pageName, link: null}];

        if(this.state.loading){
            return(
                <div className="page-service-instance">
                    <Jumbotron pageName={pageName} location={this.props.location}/>
                    <Content>
                        <div className="row m-b-20">
                            <div className="col-xs-12">
                                <ContentTitle icon="user" title="My Profile"/>
                                <Load/>
                            </div>
                        </div>
                    </Content>
                </div>
            );
        }else {
            console.log("rendering content");
            return (
                <div className="page-service-instance">
                    <Jumbotron pageName={pageName} location={this.props.location}/>
                    <Content>
                        <div className="row m-b-20">
                            <div className="col-xs-12">
                                <ContentTitle icon="user" title="My Profile"/>
                                <UserFormEdit myUser={this.state.myUser}/>
                            </div>
                        </div>
                    </Content>
                </div>
            );
        }
    }
}

export default Profile;
