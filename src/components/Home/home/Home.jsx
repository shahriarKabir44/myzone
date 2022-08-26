import React from 'react';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import PostListRoot from '../../shared/postList/postListRoot/PostListRoot';
import LeftMenu from '../LeftMenu/LeftMenu'
import './Home.css'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { setToggleStatus } from '../../../redux/HomeMenuSelector'
function Home(props) {
    const sideBarToggleStatusrDispatcher = useDispatch()

    const toggleSideMenuStatus = useSelector(state => state.currentlySelectedView.value.toggleStatus)
    const [isOnMobile, seDeviceType] = React.useState(false)
    React.useEffect(() => {
        seDeviceType(window.innerWidth <= 620)
        sideBarToggleStatusrDispatcher(setToggleStatus(-2))
    }, [sideBarToggleStatusrDispatcher])
    return (
        <div>

            {!isOnMobile && <div className="largeScreen">
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
            </div>}
            {isOnMobile && <div className="smallScreen">
                <div className="mainViewSmall">
                    <div className={`slideLeftMenu ${toggleSideMenuStatus === 1 ? "slideRight" : toggleSideMenuStatus === 0 ? "slideLeft" : ""}`}>
                        <LeftMenu />
                    </div>
                    <PostListRoot />
                </div>
            </div>}
        </div>
    );
}

export default Home;