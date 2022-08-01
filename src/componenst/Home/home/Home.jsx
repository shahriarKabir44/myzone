import React from 'react';
import NavBar from '../../shared/NavBar/NavBar';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import PostListRoot from '../postList/postListRoot/PostListRoot';
import './Home.css'
function Home(props) {
    return (
        <div>
            <NavBar />
            <div className="mainView">
                <div className="leftMenu"></div>
                <div >
                    <PostListRoot />
                </div>
                <div >
                    <ActiveUsersList />
                </div>
            </div>
        </div>
    );
}

export default Home;