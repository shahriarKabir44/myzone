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
    const [focusedViewOnMobile, setFocusedViewOnMobile] = React.useState(1)
    const [shouldToggleLeftMenu, setToggleType] = React.useState(0)
    let handlerObject = {
        handler: function (data) {
            if (focusedViewOnMobile === 0 && data === 1) {
                setToggleType(-1)
                setFocusedViewOnMobile(1)
            }

            else if (data === 0) {
                console.log("jhh", focusedViewOnMobile)
                if (focusedViewOnMobile === 1) {
                    setToggleType(1)
                    setFocusedViewOnMobile(0)
                }
                else {
                    setToggleType(-1)
                    setFocusedViewOnMobile(1)
                }

            }

            else if (focusedViewOnMobile === 1 && data === 1) {
                setToggleType(-1)
                setFocusedViewOnMobile(0)
            }

        }
    }


    React.useEffect(() => {
        sideBarTogglerDispatcher(setToggleFunction(handlerObject))
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