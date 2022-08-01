import React from 'react';
import NavBar from '../../shared/NavBar/NavBar';
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
                <div className="activeUsersList"></div>
            </div>
        </div>
    );
}

export default Home;