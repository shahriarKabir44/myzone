import React from 'react';
import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import PostListRoot from '../../shared/postList/postListRoot/PostListRoot';
import LeftMenu from '../LeftMenu/LeftMenu'
import './Home.css'
import { useDispatch } from 'react-redux'
import { setToggleFunction } from '../../../redux/HomeMenuSelector'


function Home(props) {
    const sideBarTogglerDispatcher = useDispatch()
    const [isOnMobile, seDeviceType] = React.useState(false)
    const [shouldToggleLeftMenu, setToggleType] = React.useState(0)
    let handlerObject = {
        handler: function (data) {
            if (data === 1) {
                setToggleType(1)
            }
            else {
                setToggleType(-1)
            }
        }
    }


    React.useEffect(() => {
        sideBarTogglerDispatcher(setToggleFunction({ toggleHandler: handlerObject }))
        seDeviceType(window.innerWidth <= 620)
    }, [])
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
                    <div className={`slideLeftMenu ${shouldToggleLeftMenu === 1 ? "slideRight" : shouldToggleLeftMenu === -1 ? "slideLeft" : ""}`}>
                        <LeftMenu />
                    </div>
                    <PostListRoot />
                </div>
            </div>}
        </div>
    );
}

export default Home;