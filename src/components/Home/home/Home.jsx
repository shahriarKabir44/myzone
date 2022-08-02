import React from 'react';
import NavBar from '../../shared/NavBar/NavBar';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import PostListRoot from '../postList/postListRoot/PostListRoot';
import LeftMenu from '../LeftMenu/LeftMenu'
import './Home.css'
function Home(props) {
    return (
        <div>
            <NavBar />
            <div className="largeScreen">
                <div className="mainView">
                    <div  >
                        <LeftMenu />
                    </div>
                    <div >
                        <PostListRoot />
                    </div>
                    <div >
                        <ActiveUsersList />
                    </div>
                </div>
            </div>
            <div className="smallScreen">
                <div className="mainViewSmall">
                    <PostListRoot />
                </div>
            </div>
        </div>
    );
}

export default Home;